import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IVacancyResponse } from 'src/app/shared/interfaces/vacancy/IVacancy';

@Component({
  selector: 'app-vacancies-info',
  templateUrl: './vacancies-info.component.html',
  styleUrls: ['./vacancies-info.component.scss'],
})
export class VacanciesInfoComponent implements OnInit {
  public vacancy!: IVacancyResponse;

  constructor(private activatedRout: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRout.data.subscribe((response) => {
      this.vacancy = response['vacancyInfo'];
      // this.separatedText = this.discount.text.split('.');
      // this.separatedText.pop();
    });
  }
}
