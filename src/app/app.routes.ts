import { Routes } from '@angular/router';
import { StudentsHomeComponent } from './portals/students/StudentsHome/students-home/students-home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ProtectedTestComponent } from './protected-test/protected-test.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './portals/auth/register/register.component';
import { LoginComponent } from './portals/auth/login/login.component';
import { AppComponent } from './app.component';
import { LoginGuard } from './guards/Login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'studentsHome', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'studentsHome',
    component: StudentsHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'protected',
    component: ProtectedTestComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
