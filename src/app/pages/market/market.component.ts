import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ThaiMarketService } from 'src/app/shared/services/thai/thai-market.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit{

  public userThaiCategories: Array<ICategoryResponse> = [];

  constructor(
    private thaiService: ThaiMarketService
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.thaiService.getAll().subscribe((data) => {
      this.userThaiCategories = data as ICategoryResponse[];
    });
  }

}
