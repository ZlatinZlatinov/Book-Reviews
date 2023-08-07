import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/emailValidatod';

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

  constructor(private fb: FormBuilder) { }

  logUser(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);

  }
}
