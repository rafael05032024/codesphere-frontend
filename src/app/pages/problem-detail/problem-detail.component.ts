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
import { EditorView } from '@codemirror/view';
import { FormsModule } from '@angular/forms';

import { PageContextService } from '../../services/page-context.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/utils-service';
import { IProblemTestCase } from '../../shared/models/interfaces/problem-test-case.interface';
import { ProblemService } from '../../services/problem.service';
import { SubmissionService } from '../../services/submission.service';
import { CodeEditorComponent } from '../../components/code-editor/code-editor.component';
import { CodeEditorService } from '../../services/code-editor.service';
import { LanguageService } from '../../services/language.service';
import { ILanguage } from '../../shared/models/interfaces/language.interface';

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [CommonModule, CodeEditorComponent, FormsModule],
  templateUrl: './problem-detail.component.html',
  styleUrl: './problem-detail.component.scss',
})
export class ProblemDetailComponent implements OnInit {
  private _problemId!: number;

  public disableButton = false;
  public inputText!: string;
  public outputText!: string;
  public descriptionText!: string;
  public examples!: IProblemTestCase[];
  public languages!: ILanguage[];
  public languageId!: number;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _pageContextService: PageContextService,
    private readonly _utilsService: UtilsService,
    private readonly _problemService: ProblemService,
    private readonly _submissionService: SubmissionService,
    private readonly _languageService: LanguageService,
    private readonly _codeEditorService: CodeEditorService
  ) {}

  ngOnInit(): void {
    this._pageContextService.setPageContext({
      hideProfile: true,
      maxWidth: true,
    });

    this._languageService.list().subscribe((languages) => {
      this.languages = languages;

      const { id, template } = languages[0];

      this.languageId = id;

      this._codeEditorService.setCodeText(
        this._utilsService.base64ToUtf8(template)
      );

      this._codeEditorService.setLanguage(this.languageId);
    });

    this._route.params.subscribe((params) => {
      this._problemId = Number(params['id']);

      this._problemService.getById(this._problemId).subscribe((response) => {
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

  public handleCodeSubmit(): void {
    this.disableButton = true;

    this._submissionService
      .create(
        this._problemId,
        this.languageId,
        this._utilsService.convertTextToBase64(
          this._codeEditorService.getCodeText()
        )
      )
      .subscribe(({ id }) => {
        this._router.navigate([`submission/${id}`]);
      });
  }

  public handleLanguageChange(): void {
    const lang = this.languages.find(
      (l) => l.id === Number(this.languageId)
    ) as ILanguage;

    this._codeEditorService.changeLanguage(lang.id);
    this._codeEditorService.changeCodeText(
      this._utilsService.base64ToUtf8(lang.template)
    );
  }
}
