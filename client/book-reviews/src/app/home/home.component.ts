import { Component, OnInit } from '@angular/core';
import { Book } from '../books/bookType';
import { TopRatedService } from './top-rated.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topRatedBooks: Book[] = [];
  currentIndex: number = 0;

  constructor(private topBooksService: TopRatedService) { }

  fetchBooks() {
    this.topBooksService.getTopRatedBooks().subscribe((data) => { 
      
      this.topRatedBooks = data;
    });
  } 

  onPrevClick(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.topRatedBooks.length - 1;
    } else {
      this.currentIndex--;
    }
  }

  onNextClick(): void {
    if (this.currentIndex === this.topRatedBooks.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  ngOnInit(): void {
    this.fetchBooks();
  }
}
