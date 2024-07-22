import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentCourse } from '../models/StudentCourse.model';
import { StudentCourses } from '../models/studentCourses';

@Injectable({
  providedIn: 'root',
})
export class RegisterForCoursesService {
  private registerForCoursesApi = `${environment.apiUrl}/students/RegisterForCourses/getStudentCourses`;

  constructor(private http: HttpClient) {}

  getStudentCourses(): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(
      `${this.registerForCoursesApi}/${-1}`
    );
  }

  registerStudentCourses(studentCourses: StudentCourses) {
    return this.http.post(
      `${environment.apiUrl}/students/RegisterForCourses/`,
      studentCourses
    );
  }
}
