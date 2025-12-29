import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './pages/login/auth/auth.component';
import { ProblemDetailComponent } from './pages/problem-detail/problem-detail.component';
import { SubmissionDetailComponent } from './pages/submission-detail/submission-detail.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { authGuard } from './shared/guards/auth.guard';
import { ProblemsComponent } from './pages/problems/problems.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'problem/:id',
    component: ProblemDetailComponent,
  },
  {
    path: 'problems/:category',
    component: ProblemsComponent,
    data: {
      subtitle: 'Selecione um dos seguintes problemas para resolver.',
    },
  },
  {
    path: 'submission',
    component: SubmissionDetailComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authGuard],
    data: {
      title: 'Categorias',
      subtitle:
        'Selecione uma das 8 grandes categorias de problemas para começar a resolver.',
      color: '#ef4500',
    },
  },
];
