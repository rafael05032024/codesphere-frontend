import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SsrDataLoader } from '../core/ssr/ssr-data';

@Injectable({ providedIn: 'root' })
export class PostService extends SsrDataLoader {
  constructor(
    private readonly _http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    super(_http, platformId);
  }

  public getPosts(): Observable<any[]> {
    return this.load(
      this._http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
    );
  }
}
