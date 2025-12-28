import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object) {}

  public isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}
