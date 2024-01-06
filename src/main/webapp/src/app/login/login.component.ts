import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization-service.service';
import { ILoginResponse } from '../utils/app.types';
import { Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoading: boolean = false;
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public hidePassword: boolean = true;

  constructor(private authorizationService: AuthorizationService, 
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form.addControl('username', new UntypedFormControl('', [Validators.required]));
    this.form.addControl('password', new UntypedFormControl('', [Validators.required]));
  }

  public login() {
    const username: string = this.form.get('username')?.value;
    const password: string = this.form.get('password')?.value;
    this.isLoading = true;
    this.authorizationService.login(username, password).pipe(catchError((error) => {
      console.error('An error occured: ', error.error);
      this.isLoading = false;
      this.snackBar.open('An error has occured while trying to log in. Please try again later.', 'Close', { duration: 3000 });
      return throwError(() => new Error(error.error));
    })).subscribe((response: ILoginResponse) => {
      if (response) {
        localStorage.setItem('loggedIn', 'true')
        this.router.navigate(['/dashboard']);
        this.snackBar.open('Logged in successfully.', 'Close', { duration: 3000 });
      }
      this.isLoading = false;
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}
