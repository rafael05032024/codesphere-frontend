import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { PostService } from './services/post.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { AuthContextService } from './services/auth-context.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [PostService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private _title!: string;
  private _subTitle!: string;
  private _color!: string;
  private _isLogin!: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authContextService: AuthContextService
  ) {}

  get isLogin(): boolean {
    return this._isLogin;
  }

  get title(): string {
    return this._title;
  }

  get subtitle(): string {
    return this._subTitle;
  }

  get color(): string {
    return this._color;
  }

  ngOnInit(): void {
    this._isLogin = true;

    this._router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        const url = event.urlAfterRedirects;
        this._isLogin = url.includes('/login') || url.includes('/auth');

        let route = this._route;

        while (route.firstChild) {
          route = route.firstChild;
        }

        this._title = route.snapshot.data['title'];
        this._subTitle = route.snapshot.data['subtitle'];
        this._color = route.snapshot.data['color'];
      });
  }

  public logout(): void {
    this._authContextService.logout();
  }
}
