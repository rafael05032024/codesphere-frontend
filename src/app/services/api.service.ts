import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SsrDataLoader } from '../core/ssr/ssr-data';
import { ICategory } from '../shared/models/interfaces/category.interface';
import { AuthContextService } from './auth-context.service';
import { IProblem } from '../shared/models/interfaces/problem.interface';
import { UtilsService } from './utils-service';

interface IListProblemByCategoryResponse {
  result: IProblem[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class APIService extends SsrDataLoader {
  private readonly _baseUrl = 'https://codesphere-backend-npta.onrender.com';
  private _token!: string;

  constructor(
    private readonly _http: HttpClient,
    private readonly _utilsService: UtilsService,
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
    return this._doCall<ICategory[]>(`${this._baseUrl}/category`);
  }

  public listProblemsByCategory(
    categoryId: number
  ): Observable<IListProblemByCategoryResponse> {
    return this._doCall<IListProblemByCategoryResponse>(
      `${this._baseUrl}/problem?categoryId=${categoryId}`
    );
  }

  public getProblemDetail(problemId: number): Observable<IProblem> {
    return this._doCall<IProblem>(`${this._baseUrl}/problem/${problemId}`);
  }

  private _doCall<T>(url: string): Observable<T> {
    return this.load<T>(
      this._http.get<T>(url, {
        headers: { Authorization: `Bearer ${this._token}` },
      })
    );
  }
}
