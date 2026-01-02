import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProxyService } from './proxy.service';
import { IProblem } from '../shared/models/interfaces/problem.interface';

interface IListProblem {
  result: IProblem[];
  total: number;
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
}
