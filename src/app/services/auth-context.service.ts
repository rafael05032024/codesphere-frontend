import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthContextService {
  private _token!: string;

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }
}
