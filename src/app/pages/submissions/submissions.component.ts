import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { IRow } from '../../shared/models/interfaces/row.interface';
import { IColumn } from '../../shared/models/interfaces/column.interface';
import { TableComponent } from '../../components/table/table.component';
import { UtilsService } from '../../services/utils-service';
import { SubmissionService } from '../../services/submission.service';

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.scss',
})
export class SubmissionsComponent implements OnInit {
  public rows!: IRow[];
  public columns!: IColumn[];
  public showTable = false;

  constructor(
    private readonly _router: Router,
    private readonly _utilsSerive: UtilsService,
    private readonly _submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.columns = [
      {
        class: '',
        name: 'id',
        title: '#',
      },
      {
        class: 'left',
        name: 'problem',
        title: 'Problema',
      },
      {
        class: 'left',
        name: 'status',
        title: 'Resposta',
      },
      {
        class: '',
        name: 'language',
        title: 'Linguagem',
      },
      {
        class: '',
        name: 'date',
        title: 'Data',
      },
    ];

    this._submissionService.list().subscribe((response) => {
      this.rows = response.result.map((submission) => ({
        id: {
          data: submission.id,
          customClass: 'id',
        },
        problem: {
          customClass: 'wide',
          data: `${submission.problem.id} - ${submission.problem.title}`,
        },
        status: {
          data: this._utilsSerive.translateSubmissionStatus(submission.status),
          customClass: `semi-wide bold ${this._getColor(submission.status)}`,
        },
        language: {
          data: submission.language,
          customClass: 'semi-wide-15 center',
        },
        date: {
          data: '29/12/2025 14:48',
          customClass: 'semi-wide-19 center',
        },
      }));

      this.showTable = true;
    });
  }

  public goToDetail(row: IRow): void {
    const id = row['id'].data as number;

    this._router.navigate([`submission/${id}`]);
  }

  private _getColor(status: number): string {
    if (status === 2) {
      return 'green';
    } else if (status === 3) {
      return 'red';
    } else {
      return 'bluw';
    }
  }
}
