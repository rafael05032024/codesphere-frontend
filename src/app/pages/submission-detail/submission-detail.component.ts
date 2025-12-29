import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cpp } from '@codemirror/lang-cpp';
import { syntaxHighlighting } from '@codemirror/language';
import { PageContextService } from '../../services/page-context.service';
import { APIService } from '../../services/api.service';
import { ISubmission } from '../../shared/models/interfaces/submission.interface';
import { UtilsService } from '../../services/utils-service';
import { EditorView } from '@codemirror/view';

@Component({
  selector: 'app-submission-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submission-detail.component.html',
  styleUrl: './submission-detail.component.scss',
})
export class SubmissionDetailComponent implements AfterViewInit, OnInit {
  public submissionId!: number;
  public submissionDetail!: ISubmission;
  public sourceCode!: string;
  public statusColor!: string;
  public statusText!: string;

  @ViewChild('editor', { static: false }) editor!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  private _view!: EditorView;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _pageContextService: PageContextService,
    private readonly _apiService: APIService,
    private readonly _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this._pageContextService.setPageContext({
      hideProfile: false,
      maxWidth: false,
    });

    this._route.params.subscribe((params) => {
      this.submissionId = Number(params['id']);

      this._apiService
        .getSubmissionDetail(this.submissionId)
        .subscribe((response) => {
          this.submissionDetail = response;

          this.statusText = `${this._getStatusText(response.status)} ${
            response.status === 3 ? `(${response.observation})` : ''
          }`;

          const sourceCode = this._utilsService.base64ToUtf8(
            response.source_code
          );

          this._view.dispatch({
            changes: {
              from: 0,
              to: this._view.state.doc.length,
              insert: sourceCode,
            },
          });
        });
    });
  }

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const [
      { EditorState },
      { EditorView, lineNumbers },
      { defaultHighlightStyle },
      { javascript },
    ] = await Promise.all([
      import('@codemirror/state'),
      import('@codemirror/view'),
      import('@codemirror/language'),
      import('@codemirror/lang-javascript'),
      import('@codemirror/lang-cpp'),
    ]);

    const state = EditorState.create({
      doc: '',
      extensions: [
        lineNumbers(),
        cpp(),
        EditorView.editable.of(false),
        syntaxHighlighting(defaultHighlightStyle),
      ],
    });

    this._view = new EditorView({
      state,
      parent: this.editor.nativeElement,
    });
  }

  private _getStatusText(status: number): string {
    let resposta = '';

    switch (status) {
      case 0:
        resposta = 'Created';
        break;
      case 1:
        resposta = 'Processing';
        break;
      case 2:
        resposta = 'Accepted';
        break;
      default:
        resposta = 'Failed';
        break;
    }

    return resposta;
  }
}
