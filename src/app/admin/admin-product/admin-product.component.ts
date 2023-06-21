import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { IProductResponse } from 'src/app/shared/interfaces/product/iproduct';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  public isDown = false;
  public isAdding = false;
  public editStatus = false;
  private currentProductId!: string;
  public productForm!: FormGroup;
  public isUploaded = false;
  public adminProducts: Array<IProductResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.initProductForm();
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

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null],
      weight: [0],
      allergens: [null],
      price: [null, Validators.required],
      count: [1],
      culSpecial: [false],
      noRise: [false],
      imageUrl: [null, Validators.required],
      imagePath: [null],
      favorite: [false]
    });
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategories = data as ICategoryResponse[];
    });
  }
  getProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.adminProducts = data as IProductResponse[];
    });
  }
  saveProduct(): void {
    if (this.editStatus) {
      this.productService
        .update(this.productForm.value, this.currentProductId)
        .then(() => {
          this.getProducts();
          this.toastr.success('Product successfully updated');
        });
    } else {
      this.productService.create(this.productForm.value).then(() => {
        this.getProducts();
        this.toastr.success('Product successfully created');
      });
    }
    this.editStatus = false;
    this.productForm.reset();
    this.productForm.get('count')?.setValue(1);
    this.productForm.get('weight')?.setValue(0);
    this.isAdding = !this.isAdding;
    this.isUploaded = false;
  }
  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category.name,
      name: product.name,
      path: product.path,
      description: product.description,
      allergens: product.allergens,
      weight: product.weight,
      price: product.price,
      culSpecial: product.culSpecial,
      noRise: product.noRise,
      imagePath: product.imagePath,
    });
    this.editStatus = true;
    this.isUploaded = true;
    this.isAdding = true;
    this.currentProductId = product.id;
  }
  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).then(() => {
      this.getProducts();
      this.toastr.success('Product successfully deleted');
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('product-images', file.name, file)
      .then((data) => {
        this.isUploaded = true;
        this.productForm.patchValue({
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
        this.productForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.productForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
  openMore(value: HTMLElement): void {
    value.classList.toggle('details');
  }
}
