import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthContextService {
  private readonly _key = 'codesphere@token';
  private _token!: string;

  get token(): string {
    if (this._token) {
      return this._token;
    }

    this._token = localStorage.getItem(this._key) as string;

    return this._token;
  }

  set token(token: string) {
    this._token = token;

    localStorage.setItem(this._key, token);
  }
}
