import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent implements OnInit {
  public path!: string;
  
  constructor(
    private router: Router,
  )
   { }
  
  ngOnInit(): void { }

  changePath(select: HTMLSelectElement): void{
    this.path = select.value;
    this.router.navigate(['/cabinet/' + this.path])
  }
}
