import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    CreateComponent,
    CatalogComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    CreateComponent, 
    CatalogComponent, 
    DetailsComponent
  ]
})
export class BooksModule { }
