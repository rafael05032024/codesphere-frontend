import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SsrDataLoader } from '../core/ssr/ssr-data';
import { ICategory } from '../shared/models/interfaces/category.interface';
import { AuthContextService } from './auth-context.service';
import { IProblem } from '../shared/models/interfaces/problem.interface';
import { UtilsService } from './utils-service';
import { ISubmission } from '../shared/models/interfaces/submission.interface';

interface IListProblemByCategoryResponse {
  result: IProblem[];
  total: number;
}

interface IListSubmissionResponse {
  result: ISubmission[];
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

  public createSubmission(
    problemId: number,
    languageId: number,
    sourceCode: string
  ): Observable<{ id: number }> {
    const payload = {
      problem_id: problemId,
      language_id: languageId,
      source_code: sourceCode,
    };

    return this._doCall<{ id: number }>(
      `${this._baseUrl}/submission`,
      'POST',
      payload
    );
  }

  public listSubmissions(): Observable<IListSubmissionResponse> {
    return this._doCall<IListSubmissionResponse>(`${this._baseUrl}/submission`);
  }

  public getSubmissionDetail(submissionId: number): Observable<ISubmission> {
    return this._doCall<ISubmission>(
      `${this._baseUrl}/submission/${submissionId}`
    );
  }

  private _doCall<T>(
    url: string,
    method = 'GET',
    data?: unknown
  ): Observable<T> {
    let request$: Observable<T>;
    const authorization = `Bearer ${this._token}`;

    if (method === 'POST') {
      request$ = this._http.post<T>(url, data, {
        headers: { Authorization: authorization },
      });
    } else {
      request$ = this._http.get<T>(url, {
        headers: { Authorization: authorization },
      });
    }

    return this.load<T>(request$);
  }
}
