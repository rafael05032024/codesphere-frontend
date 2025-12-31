import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';

interface IProxyOptions {
  disableCache?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProxyService {
  constructor(private readonly _httpService: HttpService) {}

  public callProxy<T>(
    resource: string,
    method: string = 'GET',
    payload: unknown = {},
    options: IProxyOptions = {}
  ): Observable<T> {
    return this._httpService.doCall<T>('/api/proxy', 'POST', {
      resource,
      method,
      data: payload,
      ...options,
    });
  }
}
