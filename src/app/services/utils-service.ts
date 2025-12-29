import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object) {}

  public isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  public base64ToUtf8(base64: string): string {
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    return new TextDecoder('utf-8').decode(bytes);
  }

  public getColorContext(id: number): string {
    let color = '';

    switch (id) {
      case 1:
        color = '#1abc9c';
        break;
      case 2:
        color = '#f39c12';
        break;
      case 3:
        color = '#52af18';
        break;
      case 4:
        color = '#e74c3c';
        break;
      case 5:
        color = '#8d816f';
        break;
      case 6:
        color = '#9b59b6';
        break;
      case 7:
        color = '#ef6ea3';
        break;
      case 8:
        color = '#34495e';
        break;
      default:
        color = '#1abc9c';
    }

    return color;
  }
}
