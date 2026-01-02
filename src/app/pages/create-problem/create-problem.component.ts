import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProblemService } from '../../services/problem.service';
import { ToastService } from '../../services/toast.service';
import { IProblemTestCase } from '../../shared/models/interfaces/problem-test-case.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-problem',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-problem.component.html',
  styleUrl: './create-problem.component.scss',
})
export class CreateProblemComponent {
  public categories = [
    {
      id: 1,
      name: 'Iniciante',
    },
    {
      id: 2,
      name: 'Ad-Hoc',
    },
    {
      id: 3,
      name: 'Strings',
    },
    {
      id: 4,
      name: 'Estruturas e Bibliotecas',
    },
    {
      id: 5,
      name: 'Matemática',
    },
    {
      id: 6,
      name: 'Paradigmas',
    },
    {
      id: 7,
      name: 'Grafos',
    },
    {
      id: 8,
      name: 'Geometria Computacional',
    },
  ];
  public fileName!: string;
  public fileContent!: string;

  public categoryId = 1;
  public title!: string;
  public description!: string;
  public inputText!: string;
  public outputText!: string;
  public testCases!: string;

  constructor(
    private readonly _router: Router,
    private readonly _problemService: ProblemService,
    private readonly _toastService: ToastService
  ) {}

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.fileName = file.name;

    const reader = new FileReader();

    reader.onload = () => {
      this.fileContent = reader.result as string;
    };

    reader.onerror = () => {
      console.error('Erro ao ler o arquivo');
    };

    reader.readAsText(file);
  }

  public createProblem(): void {
    if (!this.title) {
      this._toastService.fire({
        message: 'Título não pode ser vazio!',
        type: 'error',
        title: 'Erro',
      });

      return;
    }

    if (!this.description) {
      this._toastService.fire({
        message: 'Descrição não pode ser vazia!',
        type: 'error',
        title: 'Erro',
      });

      return;
    }

    if (!this.inputText) {
      this._toastService.fire({
        message: 'Texto de entrada não pode ser vazio!',
        type: 'error',
        title: 'Erro',
      });

      return;
    }

    if (!this.outputText) {
      this._toastService.fire({
        message: 'Texto de saída não pode ser vazio!',
        type: 'error',
        title: 'Erro',
      });

      return;
    }

    if (!this.fileContent || !this.fileContent.split('\n').length) {
      this._toastService.fire({
        message: 'Casos de teste são obrigatórios!',
        type: 'error',
        title: 'Erro',
      });

      return;
    }

    const textCases = this.fileContent.split('\n');
    const formattedCases = textCases.map((line) => ({
      input: line.split('|')[0].replace(';', '\n'),
      expected_output: line.split('|')[1].replace(';', '\n'),
      is_example: Boolean(line.split('|')[2]),
    })) as IProblemTestCase[];

    this._problemService
      .create({
        category_id: this.categoryId,
        description_text: this.description,
        input_text: this.inputText,
        output_text: this.outputText,
        test_cases: formattedCases,
        time_limit: 1,
        title: this.title,
      })
      .subscribe({
        next: () => {
          this._toastService.fire({
            message: 'Problema foi criado com sucesso.',
            title: 'Sucesso',
            type: 'success',
          });

          this.title = '';
          this.description = '';
          this.inputText = '';
          this.categoryId = 1;
          this.outputText = '';
          this.fileContent = '';
          this.fileName = '';

          this._router.navigate(['problems']);
        },

        error: (error) => {
          console.error(error);

          this._toastService.fire({
            message: error.message ?? 'Um erro ao tentar criar o problema',
            title: 'Erro',
            type: 'error',
          });
        },
      });
  }
}
