import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableComponent } from '../../components/table/table.component';
import { IColumn } from '../../shared/models/interfaces/column.interface';
import { IRow } from '../../shared/models/interfaces/row.interface';
import { ProblemService } from '../../services/problem.service';
import { IProblem } from '../../shared/models/interfaces/problem.interface';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent],
  templateUrl: './problems-search.component.html',
  styleUrl: './problems-search.component.scss',
})
export class ProblemsSearchComponent implements OnInit {
  public term!: string;
  public columns!: IColumn[];
  public rows!: IRow[];
  public showTable!: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _problemService: ProblemService
  ) {}

  ngOnInit(): void {
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

    this._loadTable();
  }

  public handleSearchClick(): void {
    this._loadTable();
  }

  public goToDetail(row: IRow): void {
    const id = row['id'].data as number;

    this._router.navigate([`problem/${id}`]);
  }

  public goToCreateProblem(): void {
    this._router.navigate([`problem`]);
  }

  private _loadTable(): void {
    this.rows = [];

    this._problemService.search(this.term ?? '').subscribe((problems) => {
      this.rows = problems.result.map((problem) =>
        this._transformToRow(problem)
      );

      this.showTable = true;

      this._cdr.detectChanges();
    });
  }

  private _transformToRow(problem: IProblem): IRow {
    return {
      id: {
        data: problem.id,
        customClass: 'id',
      },
      status: {
        customClass: 'tiny',
        data: '',
        icon:
          problem.attempted || problem.solved
            ? {
                url: problem.solved
                  ? 'assets/images/check-mark.png'
                  : 'assets/images/cross.png',
                width: 15,
              }
            : undefined,
      },
      title: {
        data: problem.title,
      },
    };
  }
}
