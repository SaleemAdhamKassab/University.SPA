import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  StudentCourse,
  StudentCoursesDto,
} from '../../../models/students.model';
import { StudentsService } from '../../../Services/students.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-register-for-courses',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './register-for-courses.component.html',
  styleUrl: './register-for-courses.component.css',
})
export class RegisterForCoursesComponent implements OnInit {
  studentCourses: StudentCourse[] = [];
  coursesIds: number[] = [];

  displayedColumns: string[] = ['select', 'id', 'name'];
  dataSource: MatTableDataSource<StudentCourse>;
  selection = new SelectionModel<StudentCourse>(true, []);
  constructor(private studentsService: StudentsService) {
    this.dataSource = new MatTableDataSource<StudentCourse>([]);
  }

  ngOnInit() {
    this.getStudentCourses();
  }
  getStudentCourses() {
    this.studentsService.getStudentCourses().subscribe({
      next: (data) => {
        this.studentCourses = data;
        this.dataSource.data = this.studentCourses;
      },
      error: (err) => {
        console.error('saleem api error: ', err);
      },
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  register() {
    const selectedIds = this.selection.selected.map(
      (course) => course.courseId
    );
    console.log('Selected course IDs:', selectedIds);
  }
}
