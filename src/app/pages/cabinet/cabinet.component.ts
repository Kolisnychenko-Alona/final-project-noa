import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent implements OnInit {
  public path!: string;
  
  constructor(
    private router: Router,
    private accountService: AccountService
  )
   { }
  
  ngOnInit(): void { }

  changePath(select: HTMLSelectElement): void{
    this.path = select.value;
    this.router.navigate(['/cabinet/' + this.path])
  }
  
  logOut(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isLogin$.next(true);
  }
}
