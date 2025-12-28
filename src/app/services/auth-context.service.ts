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

    this._token = this._getCookie('token') as string;

    console.log({ token: this._token });

    return this._token;
  }

  set token(token: string) {
    this._token = token;

    this._setToken(token);
  }

  public logout(): void {
    this._token = '';

    localStorage.removeItem(this._key);

    this._router.navigate(['/login']);
  }

  private _setToken(token: string): void {
    if (typeof document !== 'undefined') {
      document.cookie = `token=${token}; Path=/; SameSite=Lax`;
    }
  }

  private _getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
      console.log('iiii');
      return null;
    }

    return (
      document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + '='))
        ?.split('=')[1] ?? null
    );
  }
}
