import { Component } from '@angular/core';
import { RegisterForCoursesComponent } from '../../register-for-courses/register-for-courses.component';

@Component({
  selector: 'app-students-home',
  standalone: true,
  imports: [RegisterForCoursesComponent],
  templateUrl: './students-home.component.html',
  styleUrl: './students-home.component.css',
})
export class StudentsHomeComponent {}
