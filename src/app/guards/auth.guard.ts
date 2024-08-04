import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const user = this.authService.AuthUser;
    if (user) {
      return true;
    } else {
      console.log('from auth guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
