import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _userService: UserService
  ) {}

  public end(): Observable<void> {
    return this._httpService
      .doCall<void>('/auth/logout')
      .pipe(tap(() => this._userService.clean()));
  }
}
