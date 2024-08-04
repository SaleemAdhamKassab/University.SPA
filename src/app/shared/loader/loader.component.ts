import { Component } from '@angular/core';
import { LoaderService } from '../../Services/Loader.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe, MatProgressSpinner],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  loading$ = this.loaderService.loading$;
  constructor(private loaderService: LoaderService) {}
}
