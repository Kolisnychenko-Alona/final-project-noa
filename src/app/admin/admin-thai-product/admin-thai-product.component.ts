import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ThaiProductService } from 'src/app/shared/services/thai-product/thai-product.service';
import { ThaiMarketService } from 'src/app/shared/services/thai/thai-market.service';

@Component({
  selector: 'app-admin-thai-product',
  templateUrl: './admin-thai-product.component.html',
  styleUrls: ['./admin-thai-product.component.scss'],
})
export class AdminThaiProductComponent implements OnInit {
  public isDown = false;
  public isAdding = false;
  public editStatus = false;
  private currentThaiProductId!: string;
  public thaiProductForm!: FormGroup;
  public isUploaded = false;
  public adminThaiProducts: Array<IProductResponse> = [];
  public adminThaiCategories: Array<ICategoryResponse> = [];

  constructor(
    private thaiProductService: ThaiProductService,
    private thaiMarket: ThaiMarketService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getThaiProducts();
    this.getCategories();
    this.initThaiProductForm();
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

  initThaiProductForm(): void {
    this.thaiProductForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null],
      weight: [null],
      price: [null, Validators.required],
      count: [1],
      imageUrl: [null, Validators.required],
      imagePath: [null],
    });
  }

  getCategories(): void {
    this.thaiMarket.getAll().subscribe((data) => {
      this.adminThaiCategories = data as ICategoryResponse[];
    });
  }
  getThaiProducts(): void {
    this.thaiProductService.getAll().subscribe((data) => {
      this.adminThaiProducts = data as IProductResponse[];
    });
  }
  saveThaiProduct(): void {
    if (this.editStatus) {
      this.thaiProductService
        .update(this.thaiProductForm.value, this.currentThaiProductId)
        .then(() => {
          this.getThaiProducts();
          this.toastr.success('Product successfully updated');
        });
    } else {
      this.thaiProductService.create(this.thaiProductForm.value).then(() => {
        this.getThaiProducts();
        this.toastr.success('Product successfully created');
      });
    }
    this.editStatus = false;
    this.thaiProductForm.reset();
    this.isAdding = !this.isAdding;
    this.isUploaded = false;
    console.log(this.thaiProductForm.invalid);
  }
  editThaiProduct(product: IProductResponse): void {
    this.thaiProductForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
    });
    this.editStatus = true;
    this.isUploaded = true;
    this.isAdding = true;
    this.currentThaiProductId = product.id;
  }
  deleteThaiProduct(product: IProductResponse): void {
    this.thaiProductService.delete(product.id).then(() => {
      this.getThaiProducts();
      this.toastr.success('Product successfully deleted');
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('product-images', file.name, file)
      .then((data) => {
        this.isUploaded = true;
        this.thaiProductForm.patchValue({
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
        this.thaiProductForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.thaiProductForm.get(control)?.value;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.thaiProductForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
  openMore(value: HTMLElement): void {
    value.classList.toggle('details');
  }
}
