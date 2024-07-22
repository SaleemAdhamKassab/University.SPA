import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterForCoursesComponent } from './portals/students/register-for-courses/register-for-courses.component';
// import { MaterialTableComponent } from './material-table/material-table.component';
// import { HomeComponent } from './home/home.component';
// import { RegisterForCoursesComponent } from './portals/students/registerForCourses/register-for-courses/register-for-courses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RegisterForCoursesComponent,
    // MaterialTableComponent,
    // HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
