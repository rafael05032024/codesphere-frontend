import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public avatar!: string;
  public login!: string;
  public email!: string;

  constructor(
    private readonly _router: Router,
    private readonly _sessionService: SessionService,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this._userService.get();

    this.avatar = user.avatar_url;
    this.login = user.login;
    this.email = user.email;
  }

  public goTo(url: string): void {
    this._router.navigate([url]);
  }

  public logout(): void {
    this._sessionService.end().subscribe(() => {
      this._router.navigate(['login']);
    });
  }
}
