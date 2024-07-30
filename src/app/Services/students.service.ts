import { Injectable } from '@angular/core';
import { StudentCourse, StudentCoursesDto } from '../models/students.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  apiUrl = `${environment.apiUrl}/students`;
  constructor(private http: HttpClient) {}

  getStudentCourses(): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(
      `${this.apiUrl}/getStudentCourses/${3}`
    );
  }

  registerStudentCourses(studentCourses: StudentCoursesDto) {
    return this.http.post(`${this.apiUrl}/registerForCourses`, studentCourses);
  }
}
