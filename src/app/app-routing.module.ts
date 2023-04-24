import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


// import { AuthGuard } from './shared/guards/auth/auth.guard';
// import { AdminGuard } from './shared/guards/auth/admin.guard';


const routes: Routes = [
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'cabinet',
    loadChildren: () =>
      import('./pages/cabinet/cabinet.module').then((m) => m.CabinetModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'market',
    loadChildren: () =>
      import('./pages/market/market.module').then((m) => m.MarketModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'response',
    loadChildren: () =>
      import('./pages/response/response.module').then((m) => m.ResponseModule),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./pages/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
  },
  {
    path: 'delivery',
    loadChildren: () =>
      import('./pages/delivery/delivery.module').then((m) => m.DeliveryModule),
  },
  {
    path: 'vacancies',
    loadChildren: () =>
      import('./pages/vacancies/vacancies.module').then(
        (m) => m.VacanciesModule
      ),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./pages/contacts/contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./pages/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'oferta',
    loadChildren: () =>
      import('./pages/oferta/oferta.module').then((m) => m.OfertaModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth-admin',
    loadChildren: () =>
      import('./admin/auth-admin/auth-admin.module').then((m) => m.AuthAdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
