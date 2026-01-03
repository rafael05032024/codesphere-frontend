import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { cpp } from '@codemirror/lang-cpp';
import { syntaxHighlighting } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { Compartment } from '@codemirror/state';

import { CodeEditorService } from '../../services/code-editor.service';
import { ELanguage } from '../../shared/models/enums/language.enum';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
})
export class CodeEditorComponent {
  private _view!: EditorView;

  languageCompartment = new Compartment();

  @ViewChild('editor', { static: false }) editor!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  constructor(private readonly _codeEditorService: CodeEditorService) {}

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const [
      { EditorState },
      { EditorView, lineNumbers },
      { defaultHighlightStyle },
    ] = await Promise.all([
      import('@codemirror/state'),
      import('@codemirror/view'),
      import('@codemirror/language'),
      import('@codemirror/lang-javascript'),
      import('@codemirror/lang-cpp'),
    ]);

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const value = update.state.doc.toString();
        console.log(value);

        this._codeEditorService.setCodeText(value);
      }
    });

    const state = EditorState.create({
      doc: this._codeEditorService.getCodeText(),
      extensions: [
        lineNumbers(),
        this.languageCompartment.of([cpp()]),
        syntaxHighlighting(defaultHighlightStyle),
        updateListener,
      ],
    });

    this._view = new EditorView({
      state,
      parent: this.editor.nativeElement,
    });

    this.setLanguage(this._codeEditorService.getLanguage());

    this._codeEditorService.language$.subscribe((lang: number) => {
      if (!lang) return;

      this.setLanguage(lang);
    });

    this._codeEditorService.codeText$.subscribe((codeText: string) => {
      if (!codeText) return;

      this._view.dispatch({
        changes: {
          from: 0,
          to: this._view.state.doc.length,
          insert: codeText,
        },
      });
    });
  }

  async loadLanguage(lang: number) {
    switch (lang) {
      case ELanguage.CPP: {
        const { cpp } = await import('@codemirror/lang-cpp');
        return cpp();
      }
      case ELanguage.C: {
        const { cpp } = await import('@codemirror/lang-cpp');
        return cpp();
      }
      case ELanguage.JAVA: {
        const { java } = await import('@codemirror/lang-java');
        return java();
      }
      default:
        const { cpp } = await import('@codemirror/lang-cpp');
        return cpp();
    }
  }

  async setLanguage(lang: number) {
    if (!this._view) return;

    const extension = await this.loadLanguage(lang);

    this._view.dispatch({
      effects: this.languageCompartment.reconfigure(extension ?? []),
    });
  }
}
