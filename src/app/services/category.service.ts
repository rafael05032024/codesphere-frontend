import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICategory } from '../shared/models/interfaces/category.interface';
import { ProxyService } from './proxy.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private readonly _proxyService: ProxyService) {}

  public list(): Observable<ICategory[]> {
    return this._proxyService.callProxy<ICategory[]>('category');
  }
}
