import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from './../shared/product.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id: number = 1;
  title: string = '';
  srcImage = environment.imageUrl;

  product: any = {};
  brand: any[] = [{
    brand_id: '',
    brand_name: '---กรุณาเลือกยี่ห้อ ---'
  }];
  category: any[] = [{
    category_id: '',
    category_name: '---กรุณาเลือกประเภท---'
  }];
  image: any[] = [];
  images: any[] = [];

  bodyDelete: any[] = [];
  filesAmount: any;

  // myForm = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   file: new FormControl('', [Validators.required]),
  //   fileSource: new FormControl('', [Validators.required])
  // });

  constructor(private productService: ProductService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.getEditProduct();
    this.getBrand();
    this.getCategory();
    this.getImage();
  }

  getEditProduct(): void {
    let body = {
      product_id: this.id
    };
    this.productService.getEditProduct(body).subscribe({
      next: (data) => {
        this.product = data;
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          title: (error),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            window.history.back;
          }
        });
      }
    });
  }

  getBrand(): void {
    let body = {
      txtSearch: ''
    };
    this.productService.getBrand(body).subscribe({
      next: (data) => {
        this.brand = this.brand.concat(data);
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          title: (error),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            window.history.back;
          }
        });
      }
    });
  }

  getCategory(): void {
    let body = {
      txtSearch: ''
    };
    this.productService.getCategory(body).subscribe({
      next: (data) => {
        this.category = this.category.concat(data);
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          title: (error),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            window.history.back;
          }
        });
      }
    });
  }

  getImage(): void {
    let body = {
      product_id: this.id
    };
    this.productService.getImage(body).subscribe({
      next: (data) => {
        this.image = data;
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          title: (error),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            window.history.back;
          }
        });
      }
    });
  }

  // get formValue() {
  //   return this.myForm.controls;
  // }

  // // Patch form Values
  // patchValues() {
  //   this.myForm.patchValue({
  //     fileSource: this.images
  //   });
  // }

  // อัปโหลดรูปภาพ
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.filesAmount = event.target.files.length;
      for (let i = 0; i < this.filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // Push Base64 string
          this.images.push({ img_product: event.target.result, product_id: this.id });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // Remove Image
  deleteImage(url: any) {
    this.image = this.image.filter(img => (img != url));
    // this.image.forEach((response) => {
    //   console.log(response);
    // });
    this.bodyDelete.push(url)
  }

  deleteImages(url: any) {
    this.images = this.images.filter(img => (img != url));
  }

  // เพิ่มสินค้า
  updateProduct(formValue: any) {
    let body = {};
    body = {
      product_id: this.id,
      product_name: formValue.product_name,
      brand_id: formValue.brand_id,
      category_id: formValue.category_id,
      product_price: formValue.product_price,
      product_quantity: formValue.product_quantity,
      product_description: formValue.product_description
    };
    this.productService.updateProduct(body).subscribe({
      next: (data) => {
        if (data.status == "success") {
          if (this.bodyDelete.filter(item => item.img_pro_id).length) {
            let bodyDeleteImage = []
            for (let i = 0; i < this.bodyDelete.length; i++) {
              let bodyUpdate = {
                img_pro_id: this.bodyDelete[i].img_pro_id
              };
              bodyDeleteImage.push(bodyUpdate);
            }
            this.productService.deleteImageProduct(bodyDeleteImage).subscribe({
              next: (data) => {
                if (data.status == "success") {

                } else {
                  Swal.fire({
                    icon: "error",
                    title: (data.message),
                    showConfirmButton: false,
                    timer: 2000
                  }).then((result) => {
                    if (result.isDismissed) {
                      window.history.back;
                    }
                  });
                }
              }, error: (error) => {
                Swal.fire({
                  icon: "error",
                  title: (error),
                  showConfirmButton: false,
                  timer: 2000
                }).then((result) => {
                  if (result.isDismissed) {
                    window.history.back;
                  }
                });
              }
            });
          }
          if (this.images.filter(item => item.img_product).length) {
            let bodyInsertImage = [];
            for (let i = 0; i < this.images.length; i++) {
              let bodyInsert = {
                img_product: this.images[i].img_product,
                product_id: this.id
              };
              bodyInsertImage.push(bodyInsert);
            }
            this.productService.insertImageProduct(bodyInsertImage).subscribe({
              next: (data) => {
                if (data.status == "success") {

                } else {
                  Swal.fire({
                    icon: "error",
                    title: (data.message),
                    showConfirmButton: false,
                    timer: 2000
                  }).then((result) => {
                    if (result.isDismissed) {
                      window.history.back;
                    }
                  });
                }
              }, error: (error) => {
                Swal.fire({
                  icon: "error",
                  title: (error),
                  showConfirmButton: false,
                  timer: 2000
                }).then((result) => {
                  if (result.isDismissed) {
                    window.history.back;
                  }
                });
              }
            });
          }
          Swal.fire({
            icon: "success",
            title: (data.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              this.router.navigate(['/product']);
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: (data.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              window.history.back;
            }
          });
        }
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          title: (error),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            window.history.back;
          }
        });
      }
    });
  }
}
