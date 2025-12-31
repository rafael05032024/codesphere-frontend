import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProxyService } from './proxy.service';
import { ISubmission } from '../shared/models/interfaces/submission.interface';

interface IListSubmissionResponse {
  result: ISubmission[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  constructor(private readonly _proxyService: ProxyService) {}

  public list(): Observable<IListSubmissionResponse> {
    return this._proxyService.callProxy<IListSubmissionResponse>(
      'submission',
      'GET',
      {},
      {
        disableCache: true,
      }
    );
  }

  public getById(submissionId: number): Observable<ISubmission> {
    return this._proxyService.callProxy<ISubmission>(
      `submission/${submissionId}`,
      'GET',
      {},
      {
        disableCache: true,
      }
    );
  }

  public create(
    problemId: number,
    languageId: number,
    sourceCode: string
  ): Observable<ISubmission> {
    const payload = {
      problem_id: problemId,
      language_id: languageId,
      source_code: sourceCode,
    };

    return this._proxyService.callProxy<ISubmission>(
      'submission',
      'POST',
      payload
    );
  }
}
