import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { imageValidator } from 'src/app/shared/imageValidator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form = this.fromBuilder.group({
    title: ["", [Validators.required, Validators.minLength(3)]],
    author: ["", [Validators.required, Validators.minLength(5)]],
    genre: ["", [Validators.required, Validators.minLength(4)]],
    img: ["", [Validators.required, Validators.maxLength(250), imageValidator('img')]],
    review: ["", [Validators.required, Validators.minLength(20)]],
  })
  constructor(private fromBuilder: FormBuilder) { }

  createBook() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);

  }
}
