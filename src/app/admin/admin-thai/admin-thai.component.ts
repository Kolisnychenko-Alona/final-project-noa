import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ThaiMarketService } from 'src/app/shared/services/thai/thai-market.service';

@Component({
  selector: 'app-admin-thai',
  templateUrl: './admin-thai.component.html',
  styleUrls: ['./admin-thai.component.scss'],
})
export class AdminThaiComponent implements OnInit {
  public isDown = false;
  public isAdding = false;
  public editStatus = false;
  private currentThaiCategoryId!: string;
  public thaiCategoryForm!: FormGroup;
  public isUploaded = false;
  public adminThaiCategories: Array<ICategoryResponse> = [];

  constructor(
    private thaiService: ThaiMarketService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.initCategoryForm();
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

  initCategoryForm(): void {
    this.thaiCategoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imageUrl: [null, Validators.required],
      imagePath: [null]
    });
  }

  getCategories(): void {
    this.thaiService.getAll().subscribe((data) => {
      this.adminThaiCategories = data as ICategoryResponse[];
    });
  }

  saveCategory(): void {
    if (this.editStatus) {
      this.thaiService
        .update(this.thaiCategoryForm.value, this.currentThaiCategoryId)
        .then(() => {
          this.getCategories();
          this.toastr.success('Category successfully updated');
        });
    } else {
      this.thaiService.create(this.thaiCategoryForm.value).then(() => {
        this.getCategories();
        this.toastr.success('Category successfully create');
      });
    }
    this.editStatus = false;
    this.thaiCategoryForm.reset();
    this.isAdding = !this.isAdding;
    this.isUploaded = false;
  }

  editCategory(thaiCategory: ICategoryResponse): void {
    this.editStatus = true;
    this.thaiCategoryForm.patchValue({
      name: thaiCategory.name,
      path: thaiCategory.path,
      imagePath: thaiCategory.imagePath,
    });
    this.isUploaded = true;
    this.isAdding = true;
    this.currentThaiCategoryId = thaiCategory.id;
  }

  deleteCategory(thaiCategory: ICategoryResponse): void {
    this.thaiService.delete(thaiCategory.id).then(() => {
      this.getCategories();
      this.toastr.success('Category successfully deleted');
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('category-images', file.name, file)
      .then((data) => {
        this.isUploaded = true;
        this.thaiCategoryForm.patchValue({
          imagePath: data
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
        this.thaiCategoryForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.thaiCategoryForm.get(control)?.value;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.thaiCategoryForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
}
