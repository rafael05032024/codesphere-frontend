import { Component } from '@angular/core';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {}
