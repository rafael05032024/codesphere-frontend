import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CodeEditorService {
  private _bsLanguage = new BehaviorSubject<number>(NaN);
  private _bsCodeText = new BehaviorSubject<string>('');

  public language!: number;
  public codeText!: string;

  public language$ = this._bsLanguage.asObservable();
  public codeText$ = this._bsCodeText.asObservable();

  constructor() {}

  public changeLanguage(lang: number): void {
    this._bsLanguage.next(lang);
    this.language = lang;
  }

  public changeCodeText(codeText: string): void {
    this._bsCodeText.next(codeText);
    this.codeText = codeText;
  }

  public getCodeText(): string {
    return this.codeText;
  }

  public setCodeText(text: string): void {
    this.codeText = text;
  }

  public getLanguage(): number {
    return this.language;
  }

  public setLanguage(lang: number): void {
    this.language = lang;
  }
}
