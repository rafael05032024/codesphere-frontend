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
import { PageContextService } from './services/page-context.service';
import { UtilsService } from './services/utils-service';
import { HttpClient } from '@angular/common/http';
import { ProxyService } from './services/proxy.service';
import { IUser } from './shared/models/interfaces/user.interface';
import { ProfileComponent } from './components/profile/profile.component';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProfileComponent],
  providers: [PostService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title!: string;
  public subTitle!: string;
  public color!: string;
  public hideProfile!: boolean;
  public isLogin!: boolean;
  public useFullWidth!: boolean;

  public userData!: IUser;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _proxyService: ProxyService,
    private readonly _sessionService: SessionService,
    private readonly _pageContextService: PageContextService
  ) {
    this.isLogin = true;
  }

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        const url = event.urlAfterRedirects;
        this.isLogin = url.includes('/login') || url.includes('/auth');

        let route = this._route;

        this._pageContextService.clear();

        while (route.firstChild) {
          route = route.firstChild;
        }

        this._pageContextService.obsPageContext.subscribe((ctx) => {
          this.title = route.snapshot.data['title'] || ctx?.title;
          this.subTitle = route.snapshot.data['subtitle'] || ctx?.subtitle;
          this.color = route.snapshot.data['color'] || ctx?.color;
          this.hideProfile =
            !!route.snapshot.data['hideProfile'] || !!ctx?.hideProfile;
          this.useFullWidth =
            !!route.snapshot.data['maxWidth'] || !!ctx?.maxWidth;

          this._cdr.detectChanges();
        });
      });
  }

  public logout(): void {
    this._sessionService.end().subscribe(() => {
      this._router.navigate(['login']);
    });
  }

  public goTo(path: string): void {
    this._router.navigate([path]);
  }
}
