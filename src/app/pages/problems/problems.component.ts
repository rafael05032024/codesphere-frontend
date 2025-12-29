import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api.service';
import { IProblem } from '../../shared/models/interfaces/problem.interface';
import { CommonModule } from '@angular/common';
import { PageContextService } from '../../services/page-context.service';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
})
export class ProblemsComponent implements OnInit {
  private readonly _pageSize = 25;

  private _problems!: IProblem[];
  private _chunks: IProblem[][] = [];
  private _totalRecords!: number;
  private _pageCount!: number;
  private _page = 0;

  get chunks(): IProblem[][] {
    return this._chunks;
  }

  get problems(): IProblem[] {
    return this._problems;
  }

  get totalRecords(): number {
    return this._totalRecords;
  }

  get page(): number {
    return this._page;
  }

  get pageCount(): number {
    return this._pageCount;
  }

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _apiService: APIService,
    private readonly _pageContextService: PageContextService
  ) {}

  ngOnInit(): void {
    this._pageContextService.setPageContext({
      title: 'Iniciante',
      subtitle: 'Selecione um dos seguintes problemas para resolver.',
      color: '#1abc9c',
    });

    this._route.params.subscribe((params) => {
      const categoryId = Number(params['category']);

      this._apiService
        .listProblemsByCategory(categoryId)
        .subscribe((response) => {
          this._problems = response.result;

          let chunkSize = this._pageSize;
          let aux = [] as IProblem[];

          for (let i = 0; i < this._problems.length; i++) {
            aux.push(this._problems[i]);

            if (
              aux.length === chunkSize ||
              (i === this._problems.length - 1 && aux.length)
            ) {
              this._chunks.push(aux);
              aux = [];
            }
          }

          this._totalRecords = response.total;
          this._pageCount = Math.round(this._totalRecords / this._pageSize);
        });
    });
  }

  public handleLastPage(): void {
    this._page = this.chunks.length - 1;
  }

  public handleFirstPage(): void {
    this._page = 0;
  }

  public handleNextPage(): void {
    this._page++;
  }

  public handlePreviousPage(): void {
    this._page--;
  }

  public goToProblemDetail(problem: IProblem): void {
    this, this._router.navigate([`problem/${problem.id}`]);
  }
}
