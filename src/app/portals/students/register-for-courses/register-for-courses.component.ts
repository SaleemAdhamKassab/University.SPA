import { Component, OnInit } from '@angular/core';
import { RegisterForCoursesService } from './register-for-courses.service';
import { StudentCourse } from '../models/StudentCourse.model';

@Component({
  selector: 'app-register-for-courses',
  standalone: true,
  imports: [],
  templateUrl: './register-for-courses.component.html',
  styleUrl: './register-for-courses.component.css',
})
export class RegisterForCoursesComponent implements OnInit {
  constructor(private registerForCoursesService: RegisterForCoursesService) {}

  ngOnInit() {
    this.getStudentCourses();
  }

  studentCourses: StudentCourse[] = [];

  private getStudentCourses() {
    this.registerForCoursesService.getStudentCourses().subscribe({
      next: (data) => {
        this.studentCourses = data;
      },
      error: (err) => {
        console.error('saleem api error: ', err);
      },
    });
  }
}
