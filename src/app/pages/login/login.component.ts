import { Component } from '@angular/core';

import { ProxyService } from '../../services/proxy.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private readonly _proxyService: ProxyService) {}

  public sigInWithGitHub(): void {
    this._proxyService.sigInWithGitHub();
  }
}
