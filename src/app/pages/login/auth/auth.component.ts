import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContextService } from '../../../services/auth-context.service';

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
    private readonly _authContextService: AuthContextService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      const token = params['token'];

      this._authContextService.token = token;

      this._router.navigate(['categories']);
    });
  }
}
