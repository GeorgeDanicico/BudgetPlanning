import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization-service.service';
import { registerPasswordValidator } from '../utils/validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isLoading: boolean = false;
  public form: FormGroup = new FormGroup({});
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  constructor(
    private authorizationService: AuthorizationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form.addControl('username', new FormControl('', [Validators.required]));
    this.form.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.form.addControl('password', new FormControl('', [Validators.required]));
    this.form.addControl('confirmPassword', new FormControl('', [Validators.required]));
    this.form.setValidators(registerPasswordValidator());
  }

  public register(): void {
    console.log(this.form);
    const username: string = this.form.get('username')?.value;
    const email: string = this.form.get('email')?.value;
    const password: string = this.form.get('password')?.value;
    this.authorizationService.register(username, password, email).subscribe((response: any) => {
      if (response?.status == 201) {
        this.snackBar.open('User registered successfully. You can now log in.', 'Close', { duration: 3000 });
      }
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}


