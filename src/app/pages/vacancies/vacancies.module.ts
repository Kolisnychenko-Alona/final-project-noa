import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacanciesComponent } from './vacancies.component';

@NgModule({
  declarations: [VacanciesComponent],
  imports: [CommonModule, SharedModule, VacanciesRoutingModule],
})
export class VacanciesModule {}
