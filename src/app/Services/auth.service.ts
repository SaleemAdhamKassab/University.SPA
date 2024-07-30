import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAuthModel, LoginDto, RegisterDto } from '../models/auth.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  register(registerDto: RegisterDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, registerDto);
  }

  login(loginDto: LoginDto): Observable<IAuthModel> {
    return this.http.post<IAuthModel>(`${this.apiUrl}/login`, loginDto);
  }

  getProtectedData(): Observable<any> {
    return this.http.get('https://localhost:7253/api/Test/protected');
  }
}
