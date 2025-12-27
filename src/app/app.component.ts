import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PostService } from './services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [PostService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend';

  private _isLogin!: boolean;

  constructor(private readonly _activatedRoute: ActivatedRoute) {}

  get isLogin(): boolean {
    return this._isLogin;
  }

  ngOnInit(): void {
    //this._isLogin = window.location.pathname === '/login';
  }
}
