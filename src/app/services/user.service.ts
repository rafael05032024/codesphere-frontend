import { Injectable } from '@angular/core';
import { map, noop, Observable, tap } from 'rxjs';

import { ProxyService } from './proxy.service';
import { IUser } from '../shared/models/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly _proxyService: ProxyService) {}

  public get(): IUser {
    const ls = localStorage;

    return JSON.parse(ls.getItem('loggedUser') as string) as IUser;
  }

  public load(): Observable<void> {
    const ls = localStorage;

    return this._proxyService.callProxy<IUser>('user/me').pipe(
      tap((user) => ls.setItem('loggedUser', JSON.stringify(user))),
      map(noop)
    );
  }

  public clean(): void {
    const ls = localStorage;

    ls.removeItem('loggedUser');
  }
}
