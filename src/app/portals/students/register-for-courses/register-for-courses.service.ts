import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StudentCourse } from '../models/StudentCourse.model';
import { Observable } from 'rxjs';

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
}
