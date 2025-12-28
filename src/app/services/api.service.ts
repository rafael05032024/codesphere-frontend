import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SsrDataLoader } from '../core/ssr/ssr-data';
import { Observable } from 'rxjs';
import { ICategory } from '../shared/models/interfaces/category.interface';
import { AuthContextService } from './auth-context.service';

@Injectable({ providedIn: 'root' })
export class APIService extends SsrDataLoader {
  private readonly _baseUrl = 'https://codesphere-backend-npta.onrender.com';
  private _token!: string;

  constructor(
    private readonly _http: HttpClient,
    private readonly _authContextService: AuthContextService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    super(_http, platformId);

    this._token = this._authContextService.token;
  }

  public sigInWithGitHub(): void {
    const { protocol, hostname, port } = window.location;
    const origin = `${protocol}/${hostname}:${port}/auth`;

    window.location.href = `${this._baseUrl}/auth/github/login?redirect=${origin}`;
  }

  public listCategories(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(`${this._baseUrl}/category`, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }
}
