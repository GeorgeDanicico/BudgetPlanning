import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization-service.service';

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

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.form.addControl('username', new FormControl('', [Validators.required]));
    this.form.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.form.addControl('password', new FormControl('', [Validators.required]));
    this.form.addControl('confirmPassword', new FormControl('', [Validators.required]));
  }

  public register(): void {
    console.log("Register button clicked");

    const username: string = this.form.get('username')?.value;
    const email: string = this.form.get('email')?.value;
    const password: string = this.form.get('password')?.value;
    this.authorizationService.register(username, password, email).subscribe((response) => {
      console.log(response);
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}


