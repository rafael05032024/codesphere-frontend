import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthContextService {
  private readonly _key = 'codesphere@token';
  private _token!: string;

  constructor(private readonly _router: Router) {}

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

  public logout(): void {
    this._token = '';

    localStorage.removeItem(this._key);

    this._router.navigate(['/login']);
  }
}
