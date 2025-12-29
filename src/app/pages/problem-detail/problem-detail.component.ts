import { isPlatformBrowser, CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { cpp } from '@codemirror/lang-cpp';
import { syntaxHighlighting } from '@codemirror/language';
import { CodeModel } from '@ngstack/code-editor';
import { PageContextService } from '../../services/page-context.service';
import { APIService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/utils-service';
import { IProblemTestCase } from '../../shared/models/interfaces/problem-test-case.interface';
import { EditorView } from '@codemirror/view';
import { noop } from 'rxjs';

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './problem-detail.component.html',
  styleUrl: './problem-detail.component.scss',
})
export class ProblemDetailComponent implements OnInit {
  theme = 'vs-dark';

  public model: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '{}',
  };

  public options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  public disableButton = false;
  public inputText!: string;
  public outputText!: string;
  public descriptionText!: string;
  public examples!: IProblemTestCase[];
  public isBrowser!: boolean;
  private _problemId!: number;
  private _view!: EditorView;

  @ViewChild('editor', { static: false }) editor!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _pageContextService: PageContextService,
    private readonly _utilsService: UtilsService,
    private readonly _apiService: APIService
  ) {}

  ngOnInit(): void {
    //this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    this._pageContextService.setPageContext({
      hideProfile: true,
      maxWidth: true,
    });

    this._route.params.subscribe((params) => {
      this._problemId = Number(params['id']);

      this._apiService
        .getProblemDetail(this._problemId)
        .subscribe((response) => {
          this.descriptionText = response.description_text;
          this.inputText = response.input_text;
          this.outputText = response.output_text;
          this.examples = response.example_test_cases.map((etc) => ({
            ...etc,
            input: this._utilsService
              .base64ToUtf8(etc.input)
              .replaceAll('\n', '<br />'),
            expected_output: this._utilsService
              .base64ToUtf8(etc.expected_output)
              .replaceAll('\n', '<br />'),
          }));

          this._pageContextService.setPageContext({
            title: `${response.id} | ${response.title}`,
            subtitle: `Tempo limite: ${response.time_limit} segundos | Memória: 200mb`,
            color: this._utilsService.getColorContext(response.category.id),
            hideProfile: true,
            maxWidth: true,
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
      doc: `#include <stdio.h>

int main() {

    /**
     * Escreva a sua solução aqui
     * Code your solution here
     * Escriba su solución aquí
     */

    return 0;
}`,
      extensions: [
        lineNumbers(),
        cpp(),
        syntaxHighlighting(defaultHighlightStyle),
      ],
    });

    this._view = new EditorView({
      state,
      parent: this.editor.nativeElement,
    });
  }

  public handleCodeSubmit() {
    const sourceCode = this._utilsService.convertTextToBase64(
      this._view.state.doc.toString()
    );
    const languageId = 52;
    const problemId = this._problemId;

    this.disableButton = true;

    this._apiService
      .createSubmission(problemId, languageId, sourceCode)
      .subscribe(({ id }) => {
        this._router.navigate([`submission/${id}`]);
      });
  }
}
