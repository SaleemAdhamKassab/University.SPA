import { Routes } from '@angular/router';

import { RegisterComponent } from './students/auth/register/register.component';
import { LoginComponent } from './students/auth/login/login.component';
import { RegisterForCoursesComponent } from './students/registerStudent/registerForCourses/register-for-courses.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginGuard } from './core/guards/Login.guard';
import { NotFoundComponent } from './shared/components/notFound/not-found.component';
import { StudentPaymentsComponent } from './students/registerStudent/student-payments/student-payments.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'registrationForOldStudents',
    component: RegisterForCoursesComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'studentPayments',
    component: StudentPaymentsComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
