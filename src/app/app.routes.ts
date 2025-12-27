import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './pages/login/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { SubmissionDetailComponent } from './pages/submission-detail/submission-detail.component';

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
    path: 'problem',
    component: ProblemComponent,
  },
  {
    path: 'submission',
    component: SubmissionDetailComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
