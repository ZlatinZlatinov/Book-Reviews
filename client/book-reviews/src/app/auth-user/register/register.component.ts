import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { emailValidator } from 'src/app/shared/emailValidatod';
import { matchPasswordsValidator } from 'src/app/shared/matchPassword';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form = this.fb.group({
    email: ["", [Validators.required, Validators.minLength(3), emailValidator('email')]],
    username: ["", [Validators.required, Validators.minLength(5)]],
    passGroup: this.fb.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      rePass: ["", [Validators.required,]]
    },
      {
        validators: [matchPasswordsValidator('password', 'rePass')],
      })
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  regUser(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, username, passGroup } = this.form.value;
    const password = passGroup?.password;

    this.authService.register(email!, username!, password!).subscribe(() => {
      this.router.navigate(['home']);
    });

    console.log(this.form.value);
  }
}
