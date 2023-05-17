import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesComponent } from './vacancies.component';
import { VacanciesInfoComponent } from './vacancies-info/vacancies-info.component';
import { VacancyInfoResolver } from 'src/app/shared/services/vacancy/vacancy-info.resolver';

const routes: Routes = [
  {
    path: '',
    component: VacanciesComponent,
  },
  {
    path: ':id',
    component: VacanciesInfoComponent,
    resolve: { vacancyInfo: VacancyInfoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacanciesRoutingModule {}
