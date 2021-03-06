import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { IsbnPipe } from './shared/isbn.pipe';
import { DelayDirective } from './shared/delay.directive';
import { ZoomDirective } from './shared/zoom.directive';


@NgModule({
  declarations: [
    BookDetailsComponent,
    BookListComponent,
    BookListItemComponent,
    IsbnPipe,
    DelayDirective,
    ZoomDirective
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
