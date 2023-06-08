import { Component, OnInit } from '@angular/core';
import { IResponse } from 'src/app/shared/interfaces/response/IResponse';
import { ResponseService } from 'src/app/shared/services/response/response.service';

@Component({
  selector: 'app-admin-response',
  templateUrl: './admin-response.component.html',
  styleUrls: ['./admin-response.component.scss']
})
export class AdminResponseComponent implements OnInit{
  public responses: Array<IResponse> = [];
  constructor(
    private responseService: ResponseService
  ){}
  ngOnInit(): void {
    this.getResponses()
  }
  getResponses():void{
    this.responseService.getAll().subscribe(data => {
      this.responses = data as IResponse[];
    })
  }
}
