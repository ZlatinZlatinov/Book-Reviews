import { Component } from '@angular/core';
import { Book } from 'src/app/books/bookType';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  books: Book[] = []

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.fetchBooks()
  }

  fetchBooks() {
    this.favoritesService.getMyFavorites().subscribe((data) => {
      this.books = data;
    })
  }

}
