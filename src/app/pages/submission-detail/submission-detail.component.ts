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
import { EditorView } from '@codemirror/view';

import { PageContextService } from '../../services/page-context.service';
import { ISubmission } from '../../shared/models/interfaces/submission.interface';
import { UtilsService } from '../../services/utils-service';
import { SubmissionService } from '../../services/submission.service';

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
    private readonly _submissionService: SubmissionService,
    private readonly _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this._pageContextService.setPageContext({
      hideProfile: false,
      maxWidth: false,
    });

    this._route.params.subscribe((params) => {
      this.submissionId = Number(params['id']);

      this._submissionService
        .getById(this.submissionId)
        .subscribe((response) => {
          this.submissionDetail = response;

          this.statusText = `${this._utilsService.translateSubmissionStatus(
            response.status
          )} ${response.status === 3 ? `(${response.observation})` : ''}`;

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
}
