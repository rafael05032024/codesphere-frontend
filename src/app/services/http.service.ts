import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SsrDataLoader } from '../core/ssr/ssr-data';

@Injectable({ providedIn: 'root' })
export class HttpService extends SsrDataLoader {
  constructor(
    private readonly _http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    super(_http, platformId);
  }

  public doCall<T>(url: string, method = 'GET', data?: unknown): Observable<T> {
    let request$: Observable<T>;

    if (method === 'POST') {
      request$ = this._http.post<T>(url, data);
    } else {
      request$ = this._http.get<T>(url);
    }

    return this.load<T>(request$);
  }
}
