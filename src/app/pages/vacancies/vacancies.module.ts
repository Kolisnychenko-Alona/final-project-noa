import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacanciesComponent } from './vacancies.component';
import { VacanciesInfoComponent } from './vacancies-info/vacancies-info.component';

@NgModule({
  declarations: [VacanciesComponent, VacanciesInfoComponent],
  imports: [CommonModule, SharedModule, VacanciesRoutingModule],
})
export class VacanciesModule {}
