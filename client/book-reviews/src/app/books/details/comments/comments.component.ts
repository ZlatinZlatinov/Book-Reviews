import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Comment } from '../../commentType';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnDestroy {
  @Input() bookId: string = '';

  commentsArray: Comment[] = [];

  form = this.fb.group({
    text: ["", [Validators.required]]
  })

  constructor(private fb: FormBuilder, private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getBookComments(this.bookId).subscribe((c) => {
      this.commentsArray = c;
    })
  }

  comment() {
    if (this.form.invalid) {
      return;
    }

    const text = this.form.value.text;
    this.commentsService.commentBook(this.bookId, text!).subscribe(c => {
      this.commentsArray.push(c);
    })

    this.form.value.text = '';
  }

  ngOnDestroy(): void {
    this.bookId = '';
    this.commentsArray = [];
  }
}
