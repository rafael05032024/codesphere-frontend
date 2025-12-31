import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class GitHubOAuthService {
  private readonly _clientId = 'Ov23liusXoeOwEKVd2cD';
  private readonly _url = 'https://github.com/login/oauth/authorize';

  constructor(private readonly _httpService: HttpService) {}

  public authorize(): void {
    const url = new URL(this._url);
    const redirectUri = `${window.location.protocol}//${window.location.host}/auth/github`;

    url.searchParams.set('client_id', this._clientId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', 'user:email');

    window.location.assign(url.toString());
  }

  public handleCallback(code: string): Observable<void> {
    return this._httpService.doCall<void>('/api/auth/github/exchange', 'POST', {
      code,
    });
  }
}
