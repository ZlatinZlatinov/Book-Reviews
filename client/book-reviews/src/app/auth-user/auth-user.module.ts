import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
  exports: [
    LoginComponent, 
    RegisterComponent
  ]
})
export class AuthUserModule { }
