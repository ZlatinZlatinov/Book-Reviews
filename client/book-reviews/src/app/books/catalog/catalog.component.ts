import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../bookType';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  books: Book[] = []

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.fetchBooks()
  }

  fetchBooks() {
    this.booksService.getAllBooks().subscribe(data => this.books = data);
  }
}
