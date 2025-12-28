import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PageContextService {
  private _pageTitle!: string;
  private _pageSubtitle!: string;
  private _useColor!: string;

  get pageTitle(): string {
    return this._pageTitle ?? (localStorage.getItem('page.title') as string);
  }

  get pageSubtitle(): string {
    return (
      this._pageSubtitle || (localStorage.getItem('page.subtitle') as string)
    );
  }

  get useColor(): string {
    return this._useColor || (localStorage.getItem('page.color') as string);
  }

  constructor() {}

  public setPageContext(title: string, subtitle: string, color: string) {
    this._pageSubtitle = subtitle;
    this._pageTitle = title;
    this._useColor = color;

    localStorage.setItem('page.title', title);
    localStorage.setItem('page.subtitle', subtitle);
    localStorage.setItem('page.color', color);
  }
}
