import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { LoginDto } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const loginDto = new LoginDto();
      loginDto.userName = this.loginForm.value.userName;
      loginDto.password = this.loginForm.value.password;

      this.authService.login(loginDto).subscribe({
        next: (response) => {
          alert('Login successful');
          localStorage.setItem('token', response.token);

          if (response.roles.indexOf('Student') != -1)
            this.router.navigate(['studentsHome']);
          else if (response.roles.indexOf('Employee') != -1)
            this.router.navigate(['employeesHome']);
        },
        error: (err) => {
          alert(err);
        },
      });
    }
  }
}
