import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class SsrDataLoader {
  constructor(
    protected http: HttpClient,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {}

  protected load<T>(request$: Observable<T>): Observable<T> {
    return request$;

    if (isPlatformBrowser(this.platformId)) {
      return request$;
    }

    return EMPTY;
  }
}
