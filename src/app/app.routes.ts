import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GitHubComponent } from './pages/auth/github/github.component';
import { ProblemDetailComponent } from './pages/problem-detail/problem-detail.component';
import { SubmissionDetailComponent } from './pages/submission-detail/submission-detail.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { authGuard } from './shared/guards/auth.guard';
import { ProblemsComponent } from './pages/problems/problems.component';
import { SubmissionsComponent } from './pages/submissions/submissions.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'auth/github',
    component: GitHubComponent,
  },
  {
    path: 'problem/:id',
    component: ProblemDetailComponent,
    data: {
      hideProfile: true,
      maxWidth: true,
    },
  },
  {
    path: 'problems/:category',
    component: ProblemsComponent,
    data: {
      subtitle: 'Selecione um dos seguintes problemas para resolver.',
      hideProfile: false,
      maxWidth: false,
    },
  },
  {
    path: 'submissions',
    component: SubmissionsComponent,
    data: {
      title: 'Submissões',
      subtitle: 'Aqui você pode encontrar todas as suas submissões.',
      color: '#4cabb9',
      hideProfile: false,
      maxWidth: false,
    },
  },
  {
    path: 'submission/:id',
    component: SubmissionDetailComponent,
    data: {
      title: 'Código Fonte',
      subtitle:
        'Visualize o código fonte de suas submissões, junto com alguns detalhes extras.',
      color: '#7a9eaa',
      hideProfile: false,
      maxWidth: false,
    },
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
      hideProfile: false,
      maxWidth: false,
    },
  },
];
