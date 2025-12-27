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

@Component({
  selector: 'app-submission-detail',
  standalone: true,
  imports: [],
  templateUrl: './submission-detail.component.html',
  styleUrl: './submission-detail.component.scss',
})
export class SubmissionDetailComponent {
  @ViewChild('editor', { static: false }) editor!: ElementRef;
  private platformId = inject(PLATFORM_ID);

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
