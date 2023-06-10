import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IVacancyApplicationResponse } from 'src/app/shared/interfaces/vacancy-application/IVacancyApplication';
import { IVacancyResponse } from 'src/app/shared/interfaces/vacancy/IVacancy';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { VacancyApplicationService } from 'src/app/shared/services/vacancy-application/vacancy-application.service';
import { VacancyService } from 'src/app/shared/services/vacancy/vacancy.service';

@Component({
  selector: 'app-admin-vacancies',
  templateUrl: './admin-vacancies.component.html',
  styleUrls: ['./admin-vacancies.component.scss'],
})
export class AdminVacanciesComponent implements OnInit {
  public isDown = false;
  public isAdding = false;
  public editStatus = false;
  private currentVacancyId!: string;
  public vacancyForm!: FormGroup;
  public isUploaded = false;
  public more = false;
  public adminVacancies: Array<IVacancyResponse> = [];

  public applications: Array<IVacancyApplicationResponse> = [];

  constructor(
    private vacancyService: VacancyService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private vacancyApplicationService: VacancyApplicationService
  ) {}
  ngOnInit(): void {
    this.getVacancies();
    this.initVacancyForm();
    this.getApplications();
  }

  down(): void {
    this.isDown = true;
  }
  up(): void {
    this.isDown = false;
  }
  add(): void {
    this.editStatus = false;
    this.isAdding = !this.isAdding;
  }

  initVacancyForm(): void {
    this.vacancyForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      title: [null, Validators.required],
      city: [null, Validators.required],
      place: [null, Validators.required],
      employment: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required],
      imagePath: [null],
    });
  }

  getVacancies(): void {
    this.vacancyService.getAll().subscribe((data) => {
      this.adminVacancies = data as IVacancyResponse[];
    });
  }

  saveVacancy(): void {
    if (this.editStatus) {
      this.vacancyService
        .update(this.vacancyForm.value, this.currentVacancyId)
        .then(() => {
          this.getVacancies();
          this.toastr.success('Category successfully updated');
        });
    } else {
      this.vacancyService.create(this.vacancyForm.value).then(() => {
        this.getVacancies();
        this.toastr.success('Category successfully create');
      });
    }
    this.editStatus = false;
    this.vacancyForm.reset();
    this.isAdding = !this.isAdding;
    this.isUploaded = false;
  }

  editVacancy(vacancy: IVacancyResponse): void {
    this.editStatus = true;
    this.vacancyForm.patchValue({
      name: vacancy.name,
      path: vacancy.path,
      title: vacancy.title,
      city: vacancy.city,
      place: vacancy.place,
      employment: vacancy.employment,
      description: vacancy.description,
      imagePath: vacancy.imagePath,
    });
    this.isUploaded = true;
    this.isAdding = true;
    this.currentVacancyId = vacancy.id;
  }

  deleteVacancy(vacancy: IVacancyResponse): void {
    this.vacancyService.delete(vacancy.id).then(() => {
      this.getVacancies();
      this.toastr.success('Category successfully deleted');
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('vacancy-images', file.name, file)
      .then((data) => {
        this.isUploaded = true;
        this.vacancyForm.patchValue({
          imagePath: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteImage(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        console.log('File deleted');
        this.isUploaded = false;
        this.vacancyForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.vacancyForm.get(control)?.value;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.vacancyForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
  openMore(value: HTMLElement): void {
    value.classList.toggle('details');
  }
  getApplications(): void {
    this.vacancyApplicationService.getAll().subscribe((data) => {
      this.applications = data as IVacancyApplicationResponse[];
    });
  }
  deleteApplication(id: string): void{
    this.vacancyApplicationService.delete(id)
      .then(() => {
        this.getApplications();
        this.toastr.success('Vacancy application successfully deleted');
      })
  }
}
