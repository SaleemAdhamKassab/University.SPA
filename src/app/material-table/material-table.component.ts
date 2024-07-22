import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-material-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css'],
})
export class MaterialTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name']; // Adjust columns as needed
  dataSource = new MatTableDataSource<any>();
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.getServerData();
  }

  getServerData(event?: any) {
    // const pageIndex = event ? event.pageIndex : this.paginator.pageIndex;
    // const pageSize = event ? event.pageSize : this.paginator.pageSize;
    // const sortActive = this.sort.active;
    // const sortDirection = this.sort.direction;

    const pageIndex = 0;
    const pageSize = 1;
    const sortActive = 'id';
    const sortDirection = 'asc';

    this.http
      .get(
        `https://localhost:7253/api/RegisterForCourses/GetItems?page=${
          pageIndex + 1
        }&pageSize=${pageSize}&sort=${sortActive}&order=${sortDirection}`
      )
      .pipe(
        tap((data: any) => {
          this.resultsLength = data.totalCount;
          this.dataSource.data = data.items;
        })
      )
      .subscribe({
        next: (value) => {
          console.log('done');
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
