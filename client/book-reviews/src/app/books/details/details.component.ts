import { Component, OnInit } from '@angular/core';
import { Book } from '../bookType';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth-user/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  book: Book | undefined = undefined;
  isOwner: boolean = false;

  constructor(private bookService: BooksService, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.bookService.getBookById(id).subscribe((response) => {
      this.book = response;

      if (response.ownerId === this.authService.userId) {
        this.isOwner = true;
      }
    });
  }
}
