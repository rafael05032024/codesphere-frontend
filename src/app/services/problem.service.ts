import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProxyService } from './proxy.service';
import { IProblem } from '../shared/models/interfaces/problem.interface';
import { IProblemTestCase } from '../shared/models/interfaces/problem-test-case.interface';

interface IListProblem {
  result: IProblem[];
  total: number;
}

interface ICreateProblem {
  title: string;
  description_text: string;
  input_text: string;
  output_text: string;
  time_limit: number;
  category_id: number;
  test_cases: IProblemTestCase[];
}

@Injectable({ providedIn: 'root' })
export class ProblemService {
  constructor(private readonly _proxyService: ProxyService) {}

  public listByCategory(categoryId: number): Observable<IListProblem> {
    return this._proxyService.callProxy<IListProblem>(
      `problem?categoryId=${categoryId}`
    );
  }

  public getById(problemId: number): Observable<IProblem> {
    return this._proxyService.callProxy<IProblem>(`problem/${problemId}`);
  }

  public search(term: string): Observable<IListProblem> {
    return this._proxyService.callProxy<IListProblem>(
      `problem/search?term=${term}`
    );
  }

  public create(payload: ICreateProblem): Observable<void> {
    return this._proxyService.callProxy<void>('problem', 'POST', payload);
  }
}
