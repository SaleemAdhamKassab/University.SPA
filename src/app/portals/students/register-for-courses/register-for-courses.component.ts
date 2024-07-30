import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  StudentCourse,
  StudentCoursesDto,
} from '../../../models/students.model';
import { StudentsService } from '../../../Services/students.service';

@Component({
  selector: 'app-register-for-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-for-courses.component.html',
  styleUrl: './register-for-courses.component.css',
})
export class RegisterForCoursesComponent implements OnInit {
  studentCourses: StudentCourse[] = [];
  coursesIds: number[] = [];

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.getStudentCourses();
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

  getStudentCourses() {
    this.studentsService.getStudentCourses().subscribe({
      next: (data) => {
        this.studentCourses = data;
      },
      error: (err) => {
        console.error('saleem api error: ', err);
      },
    });
  }

  registerCourses() {
    const studentCourses = new StudentCoursesDto();
    studentCourses.studentId = 3;
    studentCourses.coursesIds = this.coursesIds;

    this.studentsService.registerStudentCourses(studentCourses).subscribe({
      next: (value) => {
        alert('registerd sucess..');
      },
    });
  }
}
