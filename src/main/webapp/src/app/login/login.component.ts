import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization-service.service';
import { ILoginResponse } from '../utils/app.types';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoading: boolean = false;
  public form: FormGroup = new FormGroup({});
  public hidePassword: boolean = true;

  constructor(private authorizationService: AuthorizationService, 
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form.addControl('username', new FormControl('', [Validators.required]));
    this.form.addControl('password', new FormControl('', [Validators.required]));
  }

  public login() {
    const username: string = this.form.get('username')?.value;
    const password: string = this.form.get('password')?.value;
    this.isLoading = true;
    this.authorizationService.login(username, password).subscribe((response: ILoginResponse) => {
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
