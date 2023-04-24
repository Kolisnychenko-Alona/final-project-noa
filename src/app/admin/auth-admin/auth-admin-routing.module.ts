import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminComponent } from './auth-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AuthAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthAdminRoutingModule {}
