import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth-user/auth.service';
import { AuthUserModule } from '../auth-user/auth-user.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
    AuthUserModule
  ], 
  exports: [
    HeaderComponent, 
    FooterComponent
  ]
})
export class CoreModule { }
