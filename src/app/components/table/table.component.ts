import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { IColumn } from '../../shared/models/interfaces/column.interface';
import { IRow } from '../../shared/models/interfaces/row.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
  private readonly _pageSize = 25;

  public chunks: IRow[][] = [];
  public pageCount!: number;
  public page = 0;

  @Input() columns!: IColumn[];
  @Input() rows!: IRow[];
  @Input() totalRecords!: number;
  @Output() rowClickEvent = new EventEmitter<IRow>();

  constructor() {}

  ngOnInit(): void {
    this._loadTable();
  }

  ngOnChanges(): void {
    this.chunks = [];

    this._loadTable();
  }

  private _loadTable(): void {
    let chunkSize = this._pageSize;
    let aux = [];

    for (let i = 0; i < this.rows.length; i++) {
      aux.push(this.rows[i]);

      if (
        aux.length === chunkSize ||
        (i === this.rows.length - 1 && aux.length)
      ) {
        this.chunks.push(aux);
        aux = [];
      }
    }

    this.pageCount = Math.round(this.totalRecords / this._pageSize);
  }

  public handleLastPage(): void {
    this.page = this.chunks.length - 1;
  }

  public handleFirstPage(): void {
    this.page = 0;
  }

  public handleNextPage(): void {
    this.page++;
  }

  public handlePreviousPage(): void {
    this.page--;
  }

  public dispatchRowClickEvent(row: IRow): void {
    this.rowClickEvent.emit(row);
  }
}
