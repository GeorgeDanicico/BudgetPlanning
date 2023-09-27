import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isLoading: boolean = false;
  isSidenavOpen: boolean = false;
  showDashboardComponent: boolean = false;
  showNotesComponent: boolean = false;
  showCalendarComponent: boolean = false;

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRoute();
  }

  private getRoute(): void {
    const dashboardUrl = "dashboard";
    const notesUrl = "notes";
    const calendarUrl = 'calendar';
    const currentRoute = this.route.snapshot.routeConfig?.path

    switch(currentRoute) {
      case dashboardUrl:
        this.showDashboardComponent = true;
        break;
      case notesUrl:
        this.showNotesComponent = true;
        break;
      case calendarUrl:
        this.showCalendarComponent = true;
        break;
      default:
        break;
    }
  }

  // isDataFetching(value: boolean) {
  //   this.isLoading = value;
  // }

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
