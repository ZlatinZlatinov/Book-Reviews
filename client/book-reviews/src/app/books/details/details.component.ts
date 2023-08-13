import { Component, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Book } from '../bookType';
import { BooksService } from '../books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-user/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { imageValidator } from 'src/app/shared/imageValidator';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit, OnDestroy {
  book: Book | undefined;
  isOwner: boolean = false;
  bookId: string = '';
  toggleEditView: boolean = false;

  form = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(3)]],
    author: ["", [Validators.required, Validators.minLength(5)]],
    genre: ["", [Validators.required, Validators.minLength(4)]],
    img: ["", [Validators.required, Validators.maxLength(250), imageValidator('img')]],
    review: ["", [Validators.required, Validators.minLength(20)]],
  })

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
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

  editBook() {
    if (this.form.invalid) {
      return;
    }

    const { title, author, genre, img, review } = this.form.value; 
    console.log(title);
    

    this.bookService.editBook(this.bookId, title!, author!, genre!, img!, review!)
      .subscribe((b) => {
        console.log(b);
        
        this.book = b;
        this.toggleEdit();
      });
  }

  toggleEdit() {
    this.toggleEditView = !this.toggleEditView;
  }

  ngOnDestroy(): void {
    this.book = undefined;
    this.isOwner = false;
    this.bookId = '';
  }
}
