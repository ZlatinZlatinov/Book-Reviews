import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './details/comments/comments.component';



@NgModule({
  declarations: [
    CreateComponent,
    CatalogComponent,
    DetailsComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule
  ],
  exports: [
    CreateComponent,
    CatalogComponent,
    DetailsComponent
  ]
})
export class BooksModule { }
