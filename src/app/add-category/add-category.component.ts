import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  brand: any[] = [
    { brand_id: '', brand_name: '---กรุณาเลือกยี่ห้อ ---'}
  ];
  category: any[] = [
    { category_id: '', category_name: '---กรุณาเลือกประเภท---'}
  ];
  images: any[] = [];
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private productService: ProductService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getBrand();
    this.getCategory();
  }

  getBrand(): void {
    let body = {
      txtSearch: ''
    }
    this.productService.getBrand(body).subscribe(
      (data) => {
        this.brand = this.brand.concat(data);
      }
    );
  }

  getCategory(): void {
    let body = {
      txtSearch: ''
    }
    this.productService.getCategory(body).subscribe(
      (data) => {
        this.category = this.category.concat(data);
        console.log(this.category);

      }
    );
  }

  get formValue() {
    return this.myForm.controls;
  }

  // อัปโหลดรูปภาพ
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // Push Base64 string
          this.images.push({img_product: event.target.result});
          this.patchValues();
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // Patch form Values
  patchValues() {
    this.myForm.patchValue({
      fileSource: this.images
    });
  }

  // Remove Image
  // ลบรูปภาพ
  deleteImage(url: any) {
    this.images = this.images.filter(img => (img != url));
    // this.patchValues();
  }

  // เพิ่มสินค้า
  insertProduct(formValue: any) {
    // let product_name = $("#product_name").val();
    // let brand_id = $("#brand_id").val();
    // let category_id = $("#category_id").val();
    // let product_price = $("#product_price").val();
    // let product_quantity = $("#product_quantity").val();
    // let product_description = $("#product_description").val();
    let body = {}
    body = {
      product_name: formValue.product_name,
      brand_id: formValue.brand_id,
      category_id: formValue.category_id,
      product_price: formValue.product_price,
      product_quantity: formValue.product_quantity,
      product_description: formValue.product_description
    }
    this.productService.insertProduct(body).subscribe(
      (data) => {
        if (data.status == "success") {
          let product_id = data.id;
          let bodyInsertImage = []
          for (let i = 0; i < this.images.length; i++) {
            let bodyInsert = {
              img_product: this.images[i],
              product_id: product_id
            };
            bodyInsertImage.push(bodyInsert)
          }
          console.log(bodyInsertImage);

          if(this.images.length == 1){
            this.productService.insertImageProduct(bodyInsertImage).subscribe(
              (data) => {
                if (data.status == "success") {
                  setTimeout(function () {
                    // window.location.replace("product.php");
                    //console.log(product_name, product_price, product_quantity, product_description, response);
                  }, 300);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'กรุณาเพิ่มรูปภาพ',
                    showConfirmButton: false,
                    timer: 1500
                  }).then((result) => {
                    if (result.isDismissed) {
                      window.history.back;
                    }
                  });
                }
              }
            );
          }
        } else {

        }
      }
    );
    // $.ajax({
    //   url: "query/add_product.php",
    //   type: "post",
    //   data: {
    //     "product_name": product_name,
    //     "brand_id": brand_id,
    //     "category_id": category_id,
    //     "product_price": product_price,
    //     "product_quantity": product_quantity,
    //     "product_description": product_description
    //   },
    //   success: function (response) {
    //     console.log(response);
    //     let product_id = response;
    //     // listImage.forEach((image) => {
    //     //   $.ajax({
    //     //     url: "query/add_image_product.php",
    //     //     type: "post",
    //     //     data: {
    //     //       "img_product" : image,
    //     //       "product_id" : product_id
    //     //     },
    //     //     success: function(response) {
    //     //       console.log(response);
    //     //     }
    //     //   });
    //     // });
    //     setTimeout(function () {
    //       window.location.replace("product.php");
    //       //console.log(product_name, product_price, product_quantity, product_description, response);
    //     }, 300);
    //   }
    // });
  }

  // แก้ไขสินค้า
  editProduct() {
    let product_id = $("#product_id").val();
    let product_name = $("#product_name").val();
    let brand_id = $("#brand_id").val();
    let category_id = $("#category_id").val();
    let product_price = $("#product_price").val();
    let product_quantity = $("#product_quantity").val();
    let product_description = $("#product_description").val();
    $.ajax({
      url: "query/edit_product.php",
      type: "post",
      data: {
        "product_id": product_id,
        "product_name": product_name,
        "brand_id": brand_id,
        "category_id": category_id,
        "product_price": product_price,
        "product_quantity": product_quantity,
        "product_description": product_description
      },
      success: function (response) {
        console.log(response);
        if (response) {
          $.ajax({
            url: "query/delete_image_product.php",
            type: "post",
            data: {
              "product_id": product_id
            },
            success: function (response) {
              if (response) {
                this.listImage.forEach((image: any) => {
                  this.addImage(image, product_id);
                });
                setTimeout(function () {
                  window.location.replace("product.php");
                  //console.log(product_id, image2, product_name, product_price, product_description, response);
                }, 300);
              }
            }
          })
        }
      }
    });
  }

  // เพิ่มรูปภาพ
  async addImage(image: any, product_id: any) {
    await $.ajax({
      url: "query/add_image_product.php",
      type: "post",
      data: {
        "img_product": image,
        "product_id": product_id
      },
      success: function (response) { }
    });
  }

  // ลบสินค้า
  deleteProduct(id: any) {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณจะไม่สามารถเปลี่ยนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.value) {
        //let category_name = $('#category_name').val();
        $.ajax({
          url: "query/product_delete.php",
          type: "post",
          data: {
            delete_id: id
          },
          success: function (response) {
            // console.log(response);
            if (response == "success") {
              Swal.fire({
                icon: "success",
                title: "ลบข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 2000
              }).then((result) => {
                if (result.isDismissed) {
                  //$('#delete'+id).hide('slow');
                  window.location.replace("product.php");
                }
              })
            } else {
              console.log(response);
              //alert("เกิดขึ้นผิดพลาด: " + response);
              Swal.fire({
                icon: "error",
                title: "เกิดขึ้นผิดพลาด: " + response,
                showConfirmButton: false,
                timer: 2000
              }).then((result) => {
                if (result.isDismissed) {
                  window.history.back;
                }
              })
            }
          }
        });
      }
    })
  }

}
