import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  selectedPersonalPhoto: File | null = null;
  selectedSecondarySchoolCertificatePhoto: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      fatherName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      userType: 'student',
      personalPhoto: [null, Validators.required],
      secondarySchoolCertificatePhoto: [null, Validators.required],
    });
  }

  onPersonalPhotoSelected(event: any) {
    const file = event.target.files[0];
    this.selectedPersonalPhoto = file;
    this.registerForm.patchValue({ personalPhoto: file });
    this.registerForm.get('personalPhoto')?.updateValueAndValidity();
  }

  onSecondarySchoolCertificatePhotoSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedSecondarySchoolCertificatePhoto = file;
    this.registerForm.patchValue({ secondarySchoolCertificatePhoto: file });
    this.registerForm
      .get('secondarySchoolCertificatePhoto')
      ?.updateValueAndValidity();
  }

  register() {
    if (
      this.registerForm.valid &&
      this.selectedPersonalPhoto &&
      this.selectedSecondarySchoolCertificatePhoto
    ) {
      const registerFormData = new FormData();
      registerFormData.append(
        'firstName',
        this.registerForm.get('firstName')?.value
      );
      registerFormData.append(
        'fatherName',
        this.registerForm.get('fatherName')?.value
      );
      registerFormData.append(
        'lastName',
        this.registerForm.get('lastName')?.value
      );
      registerFormData.append('email', this.registerForm.get('email')?.value);
      registerFormData.append('phone', this.registerForm.get('phone')?.value);
      registerFormData.append(
        'password',
        this.registerForm.get('password')?.value
      );
      registerFormData.append(
        'dateOfBirth',
        this.registerForm.get('dateOfBirth')?.value
      );
      registerFormData.append('gender', this.registerForm.get('gender')?.value);
      registerFormData.append(
        'address',
        this.registerForm.get('address')?.value
      );
      registerFormData.append('userType', 'student');
      registerFormData.append('personalPhoto', this.selectedPersonalPhoto);
      registerFormData.append(
        'secondarySchoolCertificatePhoto',
        this.selectedSecondarySchoolCertificatePhoto
      );

      this.authService.register(registerFormData).subscribe({
        next: () => {
          this.toastService.show('Registered successfully, please login..');
          this.router.navigate(['login']);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
    }
  }

  resetRegisterForm() {
    this.registerForm.reset();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
