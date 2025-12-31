import { Component } from '@angular/core';

import { GitHubOAuthService } from '../../services/github-oauth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private readonly _gitHubOAuthService: GitHubOAuthService) {}

  public sigInWithGitHub(): void {
    this._gitHubOAuthService.authorize();
  }
}
