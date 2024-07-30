import { Routes } from '@angular/router';
import { StudentsHomeComponent } from './portals/students/StudentsHome/students-home/students-home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ProtectedTestComponent } from './protected-test/protected-test.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './portals/auth/register/register.component';
import { LoginComponent } from './portals/auth/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'studentsHome', component: StudentsHomeComponent },
  {
    path: 'protected',
    component: ProtectedTestComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
