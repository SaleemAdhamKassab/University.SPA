import { Injectable } from '@angular/core';
import {
  studentCourse,
  StudentCoursesDto,
  studentPayments,
} from '../models/students.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiUrl = `${environment.apiUrl}/students`;
  constructor(private http: HttpClient) {}

  getStudentCourses(studentId: number): Observable<studentCourse[]> {
    return this.http.get<studentCourse[]>(
      `${this.apiUrl}/getStudentCourses/${studentId}`
    );
  }

  registerStudentCourses(studentCoursesDto: StudentCoursesDto) {
    return this.http.post(
      `${this.apiUrl}/registerForCourses`,
      studentCoursesDto
    );
  }

  getPayments(email: string) {
    let params = new HttpParams().set('email', email);

    return this.http.get<studentPayments[]>(`${this.apiUrl}/getPayments`, {
      params,
    });
  }
}
