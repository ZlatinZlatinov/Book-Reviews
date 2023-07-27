import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth-user/login/login.component';
import { RegisterComponent } from './auth-user/register/register.component';
import { AboutComponent } from './about/about.component';
import { CatalogComponent } from './books/catalog/catalog.component';
import { CreateComponent } from './books/create/create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  }, 
  {
    path: 'about',
    component: AboutComponent,
  }, 
  {
    path: 'catalog',
    component: CatalogComponent,
  }, 
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }, 
  {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }