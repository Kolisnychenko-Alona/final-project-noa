import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IVacancyApplicationResponse } from 'src/app/shared/interfaces/vacancy-application/IVacancyApplication';
import { IVacancyResponse } from 'src/app/shared/interfaces/vacancy/IVacancy';
import { VacancyApplicationService } from 'src/app/shared/services/vacancy-application/vacancy-application.service';
import { VacancyService } from 'src/app/shared/services/vacancy/vacancy.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

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

  public applications: Array<IVacancyApplicationResponse> = [];
  public applicationForm!: FormGroup;
  public isUploaded = false;

  constructor(
    private activatedRout: ActivatedRoute,
    private vacancyService: VacancyService,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private vacancyApplicationService: VacancyApplicationService,
    private imageService: ImageService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.changeProductWidth();
  }

  ngOnInit(): void {
    this.activatedRout.data.subscribe((response) => {
      this.vacancy = response['vacancyInfo'];
    });
    this.getVacancies();
    this.changeProductWidth();
    this.initApplicationForm();
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

  initApplicationForm(): void {
    this.applicationForm = this.fb.group({
      vacancyName: this.vacancy.name,
      firstName: [null, Validators.required],
      secondName: [null, Validators.required],
      filePath: [null],
      fileUrl: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      text: [null, Validators.required],
    });
  }

  sendApplication(): void {
    this.vacancyApplicationService
      .create(this.applicationForm.value)
      .then(() => {
        this.applicationForm.reset();
        this.isUploaded = false;
        this.toastr.success(
          "Ваша заявка прийнята. Наш менеджер зв'яжеться з вами."
        );
      });
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('vacancy-applications-files', file.name, file)
      .then((data) => {
        this.isUploaded = true;
        this.applicationForm.patchValue({filePath: data})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteFile(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('filePath'))
      .then(() => {
        this.isUploaded = false;
        this.applicationForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  valueByControl(control: string): string {
    return this.applicationForm.get(control)?.value;
  }
}
