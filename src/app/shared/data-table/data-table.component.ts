import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent<T> implements OnInit {
  @Input({ required: true }) dataSource: MatTableDataSource<T> =
    new MatTableDataSource<T>();
  @Input() columns: { key: string; alias: string }[] = [];
  @Input() showSendButton: boolean = false;
  @Input() sendButtonLabel!: string;
  @Input() searchInput: boolean = false;
  @Input() pagePaginator: boolean = false;
  @Input() selectRows: boolean = false;
  @Input() sortingColumns: boolean = false;
  @Output() selectedRowsChange = new EventEmitter<T[]>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<{
    active: string;
    direction: string;
  }>();
  @Output() pageChange = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
  }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedRows: T[] = [];

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // this.sort.sortChange.subscribe((sort) => {
    //   this.sortChange.emit(sort);
    // });

    // this.paginator.page.subscribe((page) => {
    //   this.pageChange.emit(page);
    // });
  }

  get displayedColumns(): string[] {
    if (this.selectRows)
      return ['select', ...this.columns.map((column) => column.key)];
    else return [...this.columns.map((column) => column.key)];
  }

  get columnAliases(): { [key: string]: string } {
    const aliases: { [key: string]: string } = {};
    this.columns.forEach((column) => {
      aliases[column.key] = column.alias;
    });
    return aliases;
  }

  applyFilter(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      this.filterChange.emit(input.value.trim().toLowerCase());
    }
  }

  onCheckboxChange(row: T, isChecked: boolean): void {
    if (isChecked) {
      this.selectedRows.push(row);
    } else {
      this.selectedRows = this.selectedRows.filter((item) => item !== row);
    }
    // this.selectedRowsChange.emit(this.selectedRows);
  }

  toggleAllRows(checked: boolean): void {
    if (checked) {
      this.selectedRows = [...this.dataSource.data];
    } else {
      this.selectedRows = [];
    }
    // this.selectedRowsChange.emit(this.selectedRows);
  }

  isSelected(row: T): boolean {
    return this.selectedRows.includes(row);
  }

  isAllSelected(): boolean {
    return (
      this.dataSource.data.length > 0 &&
      this.selectedRows.length === this.dataSource.data.length
    );
  }

  isSomeSelected(): boolean {
    return this.selectedRows.length > 0 && !this.isAllSelected();
  }

  sendSelectedRows(): void {
    // console.log('Selected rows:', this.selectedRows);
    this.selectedRowsChange.emit(this.selectedRows);
  }
}
