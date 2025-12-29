import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { PageContextService } from './services/page-context.service';
import { UtilsService } from './services/utils-service';

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
  private _hideProfile!: boolean;
  private _isLogin!: boolean;
  private _useFullWidth!: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _utilsService: UtilsService,
    private readonly _authContextService: AuthContextService,
    private readonly _pageContextService: PageContextService
  ) {
    this._isLogin = true;
  }

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

  get hideProfile(): boolean {
    return this._hideProfile;
  }

  get useFullWidth(): boolean {
    return this._useFullWidth;
  }

  ngOnInit(): void {
    if (this._utilsService.isServer()) {
      return;
    }

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

        this._pageContextService.obsPageContext.subscribe((ctx) => {
          this._title = route.snapshot.data['title'] || ctx?.title;
          this._subTitle = route.snapshot.data['subtitle'] || ctx?.subtitle;
          this._color = route.snapshot.data['color'] || ctx?.color;
          this._hideProfile = !!ctx?.hideProfile;
          this._useFullWidth = !!ctx?.maxWidth;

          this._cdr.detectChanges();
        });
      });
  }

  public logout(): void {
    this._authContextService.logout();
  }
}
