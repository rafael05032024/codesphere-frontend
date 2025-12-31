import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SsrDataLoader } from '../core/ssr/ssr-data';
import { ICategory } from '../shared/models/interfaces/category.interface';
import { IProblem } from '../shared/models/interfaces/problem.interface';
import { ISubmission } from '../shared/models/interfaces/submission.interface';
import { isPlatformBrowser } from '@angular/common';
import { IUser } from '../shared/models/interfaces/user.interface';

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
  private readonly _clientId = 'Ov23liusXoeOwEKVd2cD';

  constructor(
    private readonly _http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    super(_http, platformId);
  }

  public sigInWithGitHub(): void {
    const redirectUri = `${window.location.protocol}//${window.location.host}/auth`;

    window.location.href =
      'https://github.com/login/oauth/authorize' +
      '?client_id=' +
      this._clientId +
      '&redirect_uri=' +
      redirectUri +
      '&scope=user:email';
  }

  public listCategories(): Observable<ICategory[]> {
    return this._doCall<ICategory[]>(`/api/proxy`, 'POST', {
      resource: 'category',
    });
  }

  public listProblemsByCategory(
    categoryId: number
  ): Observable<IListProblemByCategoryResponse> {
    return this._doCall<IListProblemByCategoryResponse>(`/api/proxy`, 'POST', {
      resource: `problem?categoryId=${categoryId}`,
    });
  }

  public getProblemDetail(problemId: number): Observable<IProblem> {
    return this._doCall<IProblem>(`/api/proxy`, 'POST', {
      resource: `problem/${problemId}`,
    });
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

    return this._doCall<{ id: number }>(`/api/proxy`, 'POST', {
      resource: 'submission',
      method: 'POST',
      data: payload,
    });
  }

  public listSubmissions(): Observable<IListSubmissionResponse> {
    return this._doCall<IListSubmissionResponse>(`/api/proxy`, 'POST', {
      resource: 'submission',
      disableCache: true,
    });
  }

  public getSubmissionDetail(submissionId: number): Observable<ISubmission> {
    return this._doCall<ISubmission>(`/api/proxy`, 'POST', {
      resource: `submission/${submissionId}`,
      disableCache: true,
    });
  }

  public getUserProfile(): Observable<IUser> {
    return this._doCall<IUser>(`/api/proxy`, 'POST', {
      resource: `user/me`,
    });
  }

  public setSession(code: string): Observable<void> {
    return this._doCall<void>(`/api/auth/token`, 'POST', {
      code,
    });
  }

  public endSession(): Observable<void> {
    return this._doCall<void>(`/api/auth/logout`, 'POST', {});
  }

  private _doCall<T>(
    url: string,
    method = 'GET',
    data?: unknown
  ): Observable<T> {
    let request$: Observable<T>;

    if (method === 'POST') {
      request$ = this._http.post<T>(url, data);
    } else {
      request$ = this._http.get<T>(url);
    }

    return this.load<T>(request$);
  }
}
