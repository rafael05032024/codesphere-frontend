import { isPlatformBrowser, NgIf } from '@angular/common';
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

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [],
  templateUrl: './problem-detail.component.html',
  styleUrl: './problem-detail.component.scss',
})
export class ProblemDetailComponent implements OnInit {
  theme = 'vs-dark';

  model: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '{}',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  isBrowser!: boolean;

  @ViewChild('editor', { static: false }) editor!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
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
      doc: `function hello() {\n  console.log("Hello");\n} \n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
      extensions: [
        lineNumbers(),
        cpp(),
        syntaxHighlighting(defaultHighlightStyle),
      ],
    });

    new EditorView({
      state,
      parent: this.editor.nativeElement,
    });
  }
}
