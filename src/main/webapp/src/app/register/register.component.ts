import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization-service.service';
import { registerPasswordValidator } from '../utils/validators';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isLoading: boolean = false;
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  constructor(
    private authorizationService: AuthorizationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form.addControl('username', new UntypedFormControl('', [Validators.required]));
    this.form.addControl('email', new UntypedFormControl('', [Validators.required, Validators.email]));
    this.form.addControl('password', new UntypedFormControl('', [Validators.required]));
    this.form.addControl('confirmPassword', new UntypedFormControl('', [Validators.required]));
    this.form.setValidators(registerPasswordValidator());
  }

  public register(): void {
    console.log(this.form);
    const username: string = this.form.get('username')?.value;
    const email: string = this.form.get('email')?.value;
    const password: string = this.form.get('password')?.value;
    this.isLoading = true;
    this.authorizationService.register(username, password, email).pipe(catchError((error) => {
      console.error('An error occured: ', error.error);
      this.isLoading = false;
      this.snackBar.open('An error has occured while trying to register. Please try again later.', 'Close', { duration: 3000 });
      return throwError(() => new Error(error.error));
    })).subscribe((response: any) => {
      if (response?.status == 201) {
        this.snackBar.open('User registered successfully. You can now log in.', 'Close', { duration: 3000 });
      }
      this.isLoading = false;
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}


