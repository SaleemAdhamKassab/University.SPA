import { Component, Input, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterLink,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.setProfilePhoto();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.setProfilePhoto();
  }

  username(): string {
    const token = this.authService.getUserToken();
    const email = JSON.parse(token).email;
    return email.substring(0, email.indexOf('@'));
  }

  setProfilePhoto() {
    const token = this.authService.getUserToken();
    return JSON.parse(token).personalPhotoPath;
  }
}
