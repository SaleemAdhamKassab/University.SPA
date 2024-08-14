import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  studentCourse,
  StudentCoursesDto,
} from '../../../core/models/students.model';
import { ToastService } from '../../../core/services/toast.service';
import { StudentService } from '../../../core/services/student.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register-for-courses',
  standalone: true,
  imports: [DataTableComponent, MatSnackBarModule],
  templateUrl: './register-for-courses.component.html',
  styleUrl: './register-for-courses.component.css',
})
export class RegisterForCoursesComponent implements OnInit {
  dataSource = new MatTableDataSource<studentCourse>([]);
  columns: { key: string; alias: string }[] = [];
  filter: string = '';
  sort: { active: string; direction: string } = {
    active: 'name',
    direction: 'asc',
  };
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.loadColumns();
    this.loadStudentCourses();
  }

  loadStudentCourses() {
    this.studentService.getStudentCourses(1).subscribe((response) => {
      this.totalItems = response.length;
      this.dataSource.data = response;
    });
  }

  loadColumns(): void {
    this.columns = [
      { key: 'courseId', alias: 'ID' },
      { key: 'courseName', alias: 'Name' },
    ];
  }

  applyFilter(filter: string) {
    this.filter = filter;
    this.pageNumber = 1;
    this.loadStudentCourses();
  }

  onSortChange(sort: { active: string; direction: string }): void {
    this.sort = sort;
    this.loadStudentCourses();
  }

  onPageChange(page: { pageIndex: number; pageSize: number }): void {
    this.pageNumber = page.pageIndex + 1;
    this.pageSize = page.pageSize;
    this.loadStudentCourses();
  }

  handleSelectedRows(selectedRows: studentCourse[]) {
    this.registerCourses(selectedRows);
  }

  registerCourses(selectedCourses: studentCourse[]) {
    const token = localStorage.getItem('token');
    if (token === null) return;

    const tokenObject = JSON.parse(token);

    let studentCoursesDto = new StudentCoursesDto();
    studentCoursesDto.coursesIds = selectedCourses.map((e) => e.courseId);
    studentCoursesDto.email = tokenObject.email;

    this.studentService.registerStudentCourses(studentCoursesDto).subscribe({
      next: () => {
        this.toastService.show('Courses Registered Successfully', 'Close');
        this.router.navigate(['']);
      },
      error: (error) => {
        this.toastService.show(error.error.message);
      },
    });
  }
}
