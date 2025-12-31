import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContextService } from '../../../services/auth-context.service';
import { APIService } from '../../../services/api.service';
import { noop } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _apiService: APIService,
    private readonly _authContextService: AuthContextService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      const code = params['code'];

      this._authContextService.token = code;

      this._apiService.setSession(code).subscribe(() => {
        this._router.navigate(['categories']);
      });
    });
  }
}
