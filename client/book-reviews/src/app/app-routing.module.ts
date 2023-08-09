import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth-user/login/login.component';
import { RegisterComponent } from './auth-user/register/register.component';
import { AboutComponent } from './about/about.component';
import { CatalogComponent } from './books/catalog/catalog.component';
import { CreateComponent } from './books/create/create.component';
import { DetailsComponent } from './books/details/details.component';

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
  // {
  //   path: 'details',
  //   component: DetailsComponent,
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }, 
  {
    path: 'logout',
    pathMatch: 'full',
    redirectTo: '/home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
