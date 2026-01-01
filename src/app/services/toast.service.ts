import { Injectable } from '@angular/core';
import { map, noop, Observable, tap } from 'rxjs';

import { ProxyService } from './proxy.service';
import { IUser } from '../shared/models/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';

interface IFireToast {
  type: 'success' | 'error';
  message: string;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private readonly _toastService: ToastrService) {}

  public fire(params: IFireToast): void {
    if (params.type === 'success') {
      this._toastService.success(params.message, params.title);

      return;
    }

    this._toastService.error(params.message, params.title);
  }
}
