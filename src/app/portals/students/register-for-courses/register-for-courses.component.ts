import { Component, OnInit } from '@angular/core';
import { RegisterForCoursesService } from './register-for-courses.service';
import { StudentCourse } from '../models/StudentCourse.model';
import { FormsModule } from '@angular/forms';
import { StudentCourses } from '../models/studentCourses';

@Component({
  selector: 'app-register-for-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-for-courses.component.html',
  styleUrl: './register-for-courses.component.css',
})
export class RegisterForCoursesComponent implements OnInit {
  constructor(private registerForCoursesService: RegisterForCoursesService) {}

  ngOnInit() {
    this.getStudentCourses();
  }

  studentCourses: StudentCourse[] = [];
  coursesIds: number[] = [];

  getStudentCourses() {
    this.registerForCoursesService.getStudentCourses().subscribe({
      next: (data) => {
        this.studentCourses = data;
      },
      error: (err) => {
        console.error('saleem api error: ', err);
      },
    });
  }

  onCheckBoxChang(courseId: number, e: Event) {
    const checkBoxElement = e.target as HTMLInputElement;
    let courseIndex = this.coursesIds.indexOf(courseId);

    if (checkBoxElement.checked) {
      if (courseIndex == -1) this.coursesIds.push(courseId);
    } else {
      if (this.coursesIds.indexOf(courseId) != -1)
        this.coursesIds.splice(courseIndex, 1);
    }
  }

  registerCourses() {
    const studentCourses = new StudentCourses();
    studentCourses.studentId = 1;
    studentCourses.coursesIds = this.coursesIds;

    this.registerForCoursesService
      .registerStudentCourses(studentCourses)
      .subscribe({
        next: (value) => {
          alert('registerd sucess..');
        },
      });

    console.log(studentCourses);
  }
}
