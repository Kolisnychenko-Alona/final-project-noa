import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from './components/basket-dialog/basket-dialog.component';
import { MenuDialogComponent } from './components/menu-dialog/menu-dialog.component';
import { MarketDialogComponent } from './components/market-dialog/market-dialog.component';
import { DeliveryDialogComponent } from './components/delivery-dialog/delivery-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthDialogComponent,
    BasketDialogComponent,
    MenuDialogComponent,
    MarketDialogComponent,
    DeliveryDialogComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }