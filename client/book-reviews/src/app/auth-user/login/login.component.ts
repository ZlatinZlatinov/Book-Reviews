import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/emailValidatod';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: ["", [Validators.required, emailValidator('email')]],
    password: ["", Validators.required],
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  logUser(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.authService.login(email!, password!).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
