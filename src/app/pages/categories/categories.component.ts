import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { ProxyService } from '../../services/proxy.service';
import { ICategory } from '../../shared/models/interfaces/category.interface';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryCardComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private _categories!: ICategory[];

  get categories(): ICategory[] {
    return this._categories;
  }

  constructor(
    private readonly _proxyService: ProxyService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._proxyService
      .listCategories()
      .subscribe((_categories) => (this._categories = _categories));
  }

  public goToProblemList(category: ICategory) {
    this._router.navigate([`problems/${category.id}`]);
  }

  public getCardColor(id: number): string {
    let color = '';

    switch (id) {
      case 1:
        color = '#1abc9c';
        break;
      case 2:
        color = '#f39c12';
        break;
      case 3:
        color = '#52af18';
        break;
      case 4:
        color = '#e74c3c';
        break;
      case 5:
        color = '#8d816f';
        break;
      case 6:
        color = '#9b59b6';
        break;
      case 7:
        color = '#ef6ea3';
        break;
      case 8:
        color = '#34495e';
        break;
      default:
        color = '#1abc9c';
    }

    return color;
  }
}
