import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IVacancyResponse } from 'src/app/shared/interfaces/vacancy/IVacancy';
import { VacancyService } from 'src/app/shared/services/vacancy/vacancy.service';

@Component({
  selector: 'app-vacancies-info',
  templateUrl: './vacancies-info.component.html',
  styleUrls: ['./vacancies-info.component.scss'],
})
export class VacanciesInfoComponent implements OnInit {
  public vacancy!: IVacancyResponse;
  public userVacancies: Array<IVacancyResponse> = [];

  public slide = 0;
  public left = false;
  public right = true;
  public windowWidth = window.innerWidth;
  public vacancyWidth!: string;

  constructor(
    private activatedRout: ActivatedRoute,
    private vacancyService: VacancyService,
    private elementRef: ElementRef
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // this.windowWidth = event.target.innerWidth;
    this.changeProductWidth();
  }

  ngOnInit(): void {
    this.activatedRout.data.subscribe((response) => {
      this.vacancy = response['vacancyInfo'];
    });
    this.getVacancies();
    this.changeProductWidth();
  }
  getVacancies(): void {
    this.vacancyService.getAll().subscribe((data) => {
      this.userVacancies = data as IVacancyResponse[];
    });
  }
  changeProductWidth(): void {
    const swiperWidth =
      this.elementRef.nativeElement.querySelector('.inner').clientWidth;
    this.vacancyWidth = `${swiperWidth * 0.5}px`;
  }

  slideVacancies(value: boolean, child: HTMLElement): void {
    const vacancy = this.elementRef.nativeElement.querySelector('.vacancy');
    const vacancyWidth = vacancy?.clientWidth;
    this.windowWidth = window.innerWidth;
    if (value) {
      this.slide -= vacancyWidth;
    } else {
      this.slide += vacancyWidth;
    }
    child.style.transform = 'translateX(' + this.slide + 'px)';
    this.slide === 0 ? (this.left = false) : (this.left = true);
    this.slide === -vacancyWidth * (this.userVacancies.length - 2)
      ? (this.right = false)
      : (this.right = true);
  }
}
