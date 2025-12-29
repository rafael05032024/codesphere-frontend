import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api.service';
import { IProblem } from '../../shared/models/interfaces/problem.interface';
import { CommonModule } from '@angular/common';
import { PageContextService } from '../../services/page-context.service';
import { TableComponent } from '../../components/table/table.component';
import { IColumn } from '../../shared/models/interfaces/column.interface';
import { IRow } from '../../shared/models/interfaces/row.interface';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule, TableComponent],
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
  public columns!: IColumn[];
  public rows!: IRow[];
  public showTable!: boolean;

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

    this.showTable = false;

    this.columns = [
      {
        class: '',
        name: 'id',
        title: '#',
      },
      {
        class: 'left',
        name: 'status',
        title: '',
      },
      {
        class: 'left',
        name: 'title',
        title: 'Nome',
      },
    ];

    this._route.params.subscribe((params) => {
      const categoryId = Number(params['category']);

      this._apiService
        .listProblemsByCategory(categoryId)
        .subscribe((response) => {
          this.rows = response.result.map((problem) => ({
            id: {
              data: problem.id,
              customClass: 'id',
            },
            status: {
              customClass: 'tiny',
              data: 'ok',
            },
            title: {
              data: problem.title,
            },
          }));

          this.showTable = true;
        });
    });
  }

  public goToDetail(row: IRow): void {
    const id = row['id'].data as number;

    this._router.navigate([`problem/${id}`]);
  }
}
