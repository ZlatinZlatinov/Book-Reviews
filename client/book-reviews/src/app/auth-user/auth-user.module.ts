import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appInterceptorProvider } from '../app.interceptor';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [appInterceptorProvider],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthUserModule { }
