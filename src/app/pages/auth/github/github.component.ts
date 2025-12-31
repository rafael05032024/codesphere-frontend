import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GitHubOAuthService } from '../../../services/github-oauth.service';
import { switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './github.component.html',
  styleUrl: './github.component.scss',
})
export class GitHubComponent implements OnInit {
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _gitHubOAuthService: GitHubOAuthService,
    private readonly _userSerivce: UserService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      const code = params['code'] as string;

      this._gitHubOAuthService
        .handleCallback(code)
        .pipe(switchMap(() => this._userSerivce.load()))
        .subscribe(() => {
          this._router.navigate(['categories']);
        });
    });
  }
}
