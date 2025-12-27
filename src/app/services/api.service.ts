import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SsrDataLoader } from '../core/ssr/ssr-data';

@Injectable({ providedIn: 'root' })
export class APIService extends SsrDataLoader {
  private readonly _baseUrl = 'https://codesphere-backend-npta.onrender.com';

  constructor(
    private readonly _http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    super(_http, platformId);
  }

  public sigInWithGitHub(): void {
    const origin = `${window.location.href}auth`;

    window.location.href = `${this._baseUrl}/auth/github/login?redirect=${origin}`;
  }
}
