import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IAuthModel } from '../models/auth.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient, private router: Router) {}
  public get AuthUser(): IAuthModel | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  register(registerFormData: FormData): Observable<IAuthModel> {
    return this.http.post<IAuthModel>(
      `${this.apiUrl}/register`,
      registerFormData
    );
  }

  login(loginDto: FormGroup): Observable<IAuthModel> {
    return this.http.post<IAuthModel>(`${this.apiUrl}/login`, loginDto);
  }

  getUserToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return 'N/A';
  }

  isLoggedIn(): boolean {
    const storedToken = localStorage.getItem('token');
    if (storedToken) return true;
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
