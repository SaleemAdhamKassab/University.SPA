import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { studentPayments } from '../../../core/models/students.model';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-student-payments',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './student-payments.component.html',
  styleUrl: './student-payments.component.css',
})
export class StudentPaymentsComponent implements OnInit {
  dataSource = new MatTableDataSource<studentPayments>([]);
  columns: { key: string; alias: string }[] = [];
  totalItems: number = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadColumns();
    this.loadStudentPayments();
  }

  loadColumns() {
    this.columns = [
      { key: 'id', alias: 'ID' },
      { key: 'description', alias: 'Description' },
      { key: 'status', alias: 'Status' },
      { key: 'term', alias: 'Term' },
      { key: 'validatedBy', alias: 'Validated By' },
      { key: 'currency', alias: 'Currency' },
      { key: 'program', alias: 'Program' },
      { key: 'link', alias: 'Link' },
      { key: 'addedOn', alias: 'Added On' },
    ];
  }

  loadStudentPayments() {
    const token = localStorage.getItem('token');
    if (token === null) return;

    const tokenObject = JSON.parse(token);

    this.studentService.getPayments(tokenObject.email).subscribe((response) => {
      this.totalItems = response.length;
      this.dataSource.data = response;
    });
  }
}
