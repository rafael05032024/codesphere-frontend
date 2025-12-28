import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
})
export class ProblemsComponent implements OnInit {
  constructor(private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {});
  }
}
