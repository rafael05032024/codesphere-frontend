import { Component } from '@angular/core';

import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private readonly _apiService: APIService) {}

  public sigInWithGitHub(): void {
    this._apiService.sigInWithGitHub();
  }
}
