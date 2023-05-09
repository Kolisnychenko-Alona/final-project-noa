import { Component, OnInit } from '@angular/core';
import { IVacancyResponse } from 'src/app/shared/interfaces/vacancy/IVacancy';
import { VacancyService } from 'src/app/shared/services/vacancy/vacancy.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss'],
})
export class VacanciesComponent implements OnInit {
  public userVacancies: Array<IVacancyResponse> = [];

  constructor(private vacancyService: VacancyService) {}

  ngOnInit(): void {
    this.getVacancies();
  }

  getVacancies(): void {
    this.vacancyService.getAll().subscribe((data) => {
      this.userVacancies = data as IVacancyResponse[];
    });
  }
}
