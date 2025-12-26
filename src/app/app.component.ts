import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostService } from './services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [PostService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private readonly _postService: PostService){}

  ngOnInit(): void {
    this._postService.getPosts().subscribe((resposta) => {
      console.log({ resposta });
    });
  }
}
