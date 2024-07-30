import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { RegisterDto } from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      userType: 0,
    });
  }

  register() {
    if (this.registerForm.valid) {
      const registerDto = new RegisterDto();
      registerDto.firstName = this.registerForm.value.firstName;
      registerDto.lastName = this.registerForm.value.lastName;
      registerDto.phone = this.registerForm.value.phone;
      registerDto.email = this.registerForm.value.email;
      registerDto.password = this.registerForm.value.password;
      registerDto.userType = 0;

      this.authService.register(registerDto).subscribe({
        next: (response) => {
          alert('Register successful, please Login...');
        },
        error: (err) => {
          alert(err);
        },
      });
    }
  }
}
