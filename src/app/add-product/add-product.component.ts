import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  brand: any[] = [
    { brand_id: '', brand_name: '---กรุณาเลือกยี่ห้อ ---' }
  ];
  category: any[] = [
    { category_id: '', category_name: '---กรุณาเลือกประเภท---' }
  ];
  images: any[] = [];
  // myForm = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   file: new FormControl('', [Validators.required]),
  //   fileSource: new FormControl('', [Validators.required])
  // });

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getBrand();
    this.getCategory();
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
    }
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

  // get formValue() {
  //   return this.myForm.controls;
  // }

  // อัปโหลดรูปภาพ
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // Push Base64 string
          this.images.push({ img_product: event.target.result });
          // this.patchValues();
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // Patch form Values
  // patchValues() {
  //   this.myForm.patchValue({
  //     fileSource: this.images
  //   });
  // }

  // Remove Image
  deleteImage(url: any) {
    this.images = this.images.filter(img => (img != url));
    // this.patchValues();
  }

  // เพิ่มสินค้า
  insertProduct(formValue: any) {
    let body = {}
    body = {
      product_name: formValue.product_name,
      brand_id: formValue.brand_id,
      category_id: formValue.category_id,
      product_price: formValue.product_price,
      product_quantity: formValue.product_quantity,
      product_description: formValue.product_description
    }
    this.productService.insertProduct(body).subscribe({
      next: (data) => {
        if (data.status == "success") {
          let product_id = data.id;
          let bodyInsertImage = []
          for (let i = 0; i < this.images.length; i++) {
            let bodyInsert = {
              img_product: this.images[i].img_product,
              product_id: product_id
            };
            bodyInsertImage.push(bodyInsert)
          }
          if (this.images.length > 0) {
            this.productService.insertImageProduct(bodyInsertImage).subscribe({
              next: (data) => {
                if (data.status == "success") {
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
          } else {
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
          }
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
