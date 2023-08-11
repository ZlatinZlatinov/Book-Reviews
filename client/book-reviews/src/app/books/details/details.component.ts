import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../bookType';
import { BooksService } from '../books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-user/auth.service';
import { Comment } from '../commentType';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit, OnDestroy {
  book: Book | undefined;
  isOwner: boolean = false;
  bookId: string = ''; 

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id']; 
    
    this.bookService.getBookById(this.bookId)
    .subscribe((response) => {
      this.book = response;
      

        if (response.ownerId === this.authService.userId) {
          this.isOwner = true;
        }
      });
  }

  addToFavorites(): void {
    this.bookService.addBookToUserFavorites(this.bookId)
      .subscribe(() => {
        window.alert('Book added to Favorites-List!');
      });
  }

  likeBook(): void {
    this.bookService.like(this.bookId).subscribe(() => {
      this.book?.likes.push(this.authService.userId!);
    });
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.bookId)
      .subscribe(() => this.router.navigate(['catalog']));
  }


  ngOnDestroy(): void {
    this.book = undefined;
    this.isOwner = false;
    this.bookId = '';
  }
}
