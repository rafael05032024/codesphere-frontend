import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProxyService } from '../../services/proxy.service';
import { PageContextService } from '../../services/page-context.service';
import { TableComponent } from '../../components/table/table.component';
import { IColumn } from '../../shared/models/interfaces/column.interface';
import { IRow } from '../../shared/models/interfaces/row.interface';
import { UtilsService } from '../../services/utils-service';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
})
export class ProblemsComponent implements OnInit {
  private readonly _map = {
    1: 'Iniciante',
    2: 'Ad-Hoc',
    3: 'strings',
    4: 'Estruturas e Bibliotecas',
    5: 'Matemática',
    6: 'Paradigmas',
    7: 'Grafos',
    8: 'Geometria Computacional',
  } as { [key: number]: string };

  public columns!: IColumn[];
  public rows!: IRow[];
  public showTable!: boolean;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _proxyService: ProxyService,
    private readonly _utilsService: UtilsService,
    private readonly _pageContextService: PageContextService
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

    this._route.params.subscribe((params) => {
      const categoryId = Number(params['category']);

      this._pageContextService.setPageContext({
        title: this._map[categoryId],
        subtitle: 'Selecione um dos seguintes problemas para resolver.',
        color: this._utilsService.getColorContext(categoryId),
      });

      this._proxyService
        .listProblemsByCategory(categoryId)
        .subscribe((response) => {
          this.rows = response.result.map((problem) => ({
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
