import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSidenavOpen: boolean = false;

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout() {
    this.authorizationService.logout().subscribe((response) => {
      localStorage.removeItem('sessionId');
      this.router.navigate(['/login']);
      this.snackBar.open('Logged out successfully.', 'Close', { duration: 3000 });
    });
  }
}
