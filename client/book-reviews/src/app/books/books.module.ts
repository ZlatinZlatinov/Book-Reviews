import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './details/comments/comments.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CreateComponent,
    CatalogComponent,
    DetailsComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule, 
    SharedModule
  ],
  exports: [
    CreateComponent,
    CatalogComponent,
    DetailsComponent
  ]
})
export class BooksModule { }
