import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IPageContext {
  title?: string;
  subtitle?: string;
  color?: string;
  hideProfile?: boolean;
  maxWidth?: boolean;
}

@Injectable({ providedIn: 'root' })
export class PageContextService {
  private _bsPageContext = new BehaviorSubject<IPageContext | null>(null);

  public obsPageContext = this._bsPageContext.asObservable();

  constructor() {}

  public setPageContext(context: IPageContext) {
    this._bsPageContext.next({ ...context });
  }
}
