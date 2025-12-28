import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input()
  public id!: number;

  @Input()
  public description!: string;

  @Input()
  public title!: string;

  @Input()
  public color!: string;

  @Input()
  public totalProblems!: number;
}
