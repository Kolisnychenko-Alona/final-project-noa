import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router) // private accountService: AccountService
  {}

  ngOnInit(): void {}
  logOut(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    // this.accountService.isLogin$.next(true);
  }
}
