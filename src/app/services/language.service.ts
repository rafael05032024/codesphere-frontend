import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProxyService } from './proxy.service';
import { ILanguage } from '../shared/models/interfaces/language.interface';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(private readonly _proxyService: ProxyService) {}

  public list(): Observable<ILanguage[]> {
    return this._proxyService.callProxy<ILanguage[]>('language');
  }
}
