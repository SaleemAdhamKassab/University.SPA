import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-protected-test',
  standalone: true,
  imports: [],
  templateUrl: './protected-test.component.html',
  styleUrl: './protected-test.component.css',
})
export class ProtectedTestComponent {
  protectedData: any;
  errorMessage: string = '';
  constructor(private authService: AuthService) {}

  getProtectedData() {
    this.authService.getProtectedData().subscribe({
      next: (response) => {
        this.protectedData = JSON.stringify(response);
      },
      error: (err) => {
        console.error('Error accessing protected endpoint', err);
        this.errorMessage = 'Error accessing protected endpoint';
      },
    });
  }
}
