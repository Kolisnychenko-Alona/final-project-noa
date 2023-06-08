import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseService } from 'src/app/shared/services/response/response.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class ResponseComponent implements OnInit {
  public responseForm!: FormGroup;
  public rating = 0;

  constructor(
    private fb: FormBuilder,
    private responseService: ResponseService
  ) { }
  
  ngOnInit(): void {
    this.initResponseForm();
  }


  initResponseForm(): void {
    this.responseForm = this.fb.group({
      rating: [0],
      text: [null, Validators.required],
      name: [null, Validators.required],
      phone: [null, Validators.required],
    });
  }

  setRating(rating: number) {
    this.rating = rating;
    const ratingControl = this.responseForm.get('rating');
    ratingControl?.setValue(rating);
    ratingControl?.updateValueAndValidity();
  }
  sendResponse(): void{
    this.responseService.create(this.responseForm.value);
    this.responseForm.reset();
  }
}
