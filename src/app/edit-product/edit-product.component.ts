import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  srcImage = environment.imageUrl

  product: any = {};
  brand: any[] = [
    { brand_id: '', brand_name: '---กรุณาเลือกยี่ห้อ ---' }
  ];
  category: any[] = [
    { category_id: '', category_name: '---กรุณาเลือกประเภท---' }
  ];
  image: any[] = [];
  images: any[] = [];
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  form: FormGroup = this.formBuilder.group({
    avatar: ['']
  });;

  constructor(private productService: ProductService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.getEditProduct();
    this.getBrand();
    this.getCategory();
    this.getImage();
    this.form
  }

  getEditProduct(): void {
    let body = {
      product_id: this.id
    }
    this.productService.getEditProduct(body).subscribe(
      (data) => {
        this.product = data;
      }
    );
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

  getImage(): void {
    let body = {
      product_id: this.id
    }
    this.productService.getImage(body).subscribe(
      (data) => {
        this.image = data;
      }
    );
  }

  get formValue() {
    return this.myForm.controls;
  }

  filesAmount: any
  // อัปโหลดรูปภาพ
  uploadImage(event: any) {
    console.log(event.target.files);

    if (event.target.files && event.target.files[0]) {
      this.filesAmount = event.target.files.length;
      console.log(this.filesAmount);

      for (let i = 0; i < this.filesAmount; i++) {
        var reader = new FileReader();
        console.log(reader);
        reader.onload = (event: any) => {
          // Push Base64 string
          this.images.push({ img_product: event.target.result, product_id: this.id });
          console.log(this.images);

          // this.patchValues();
        }
        console.log(event.target.files[i]);

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

  bodyDelete: any[] = []
  // Remove Image
  // ลบรูปภาพ
  deleteImage(url: any) {
    console.log(url);

    this.image = this.image.filter(img => (img != url));
    console.log(this.image);
    this.image.forEach((response) => {
      console.log(response);
      // image_list.append(`
      // <tr id="${response}" name="${response}">
      //   <td>
      //     <img src="upload/${response}" style="width: 150px;">
      //   </td>
      //   <td>
      //     <button class="btn btn-danger" style="background-color: #dc3545;" onclick="deleteImage('${response}')">ลบ</button>
      //   </td>
      // </tr>
      // `);
    });
    this.bodyDelete.push(url)
    console.log(this.bodyDelete);

  }

  deleteImages(url: any) {
    console.log(url);

    this.images = this.images.filter(img => (img != url));
    console.log(this.images);

    // this.patchValues();
  }

  // เพิ่มสินค้า
  updateProduct(formValue: any) {
    let body = {}
    body = {
      product_id: this.id,
      product_name: formValue.product_name,
      brand_id: formValue.brand_id,
      category_id: formValue.category_id,
      product_price: formValue.product_price,
      product_quantity: formValue.product_quantity,
      product_description: formValue.product_description
    }
    this.productService.updateProduct(body).subscribe(
      (data) => {
        if (data.status == "success") {
          if (this.bodyDelete.filter(item => item.img_pro_id).length) {
            console.log(this.bodyDelete.filter(item => item.img_pro_id).length);
            let bodyDeleteImage = []
            for (let i = 0; i < this.bodyDelete.length; i++) {
              let bodyUpdate = {
                img_pro_id: this.bodyDelete[i].img_pro_id
              };
              bodyDeleteImage.push(bodyUpdate)
            }
            this.productService.deleteImageProduct(bodyDeleteImage).subscribe({
              next: (data) => {
                if (data.status == "success") {

                }
                console.log(data);
              }, error: (error) => {
                console.log(error);
              }, complete: () => {
                console.log('complete');
              }
            })
          }
          if (this.images.filter(item => item.img_product).length) {
            console.log(this.bodyDelete.filter(item => item.img_product).length);
            let bodyInsertImage = []
            for (let i = 0; i < this.images.length; i++) {
              let bodyInsert = {
                img_product: this.images[i].img_product,
                product_id: this.id
              };
              bodyInsertImage.push(bodyInsert)
            }
            console.log(bodyInsertImage);
            this.productService.insertImageProduct(bodyInsertImage).subscribe({
              next: (data) => {
                if (data.status == "success") {

                }
                console.log(data);
              }, error: (error) => {
                console.log(error);
              }, complete: () => {
                console.log('complete');
              }
            });
          }

        } else {

        }
      }
    );
  }

  // เพิ่มรูปภาพ
  async addImage(image: any) {
    let bodyImage = []
    bodyImage.push(image)
    let bodyInsertImage = []
    for (let i = 0; i < bodyImage.length; i++) {
      let bodyInsert = {
        img_product: bodyImage[i].img_product,
        product_id: this.id
      };
      bodyInsertImage.push(bodyInsert)
    }
    console.log(bodyInsertImage);
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
    // await $.ajax({
    //   url: "query/add_image_product.php",
    //   type: "post",
    //   data: {
    //     "img_product": image,
    //     "product_id": product_id
    //   },
    //   success: function (response) { }
    // });
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






  filedata: any;
  /* File onchange event */
  fileEvent(e: any) {
    this.filedata = e.target.files[0];
    this.filesAmount = e.target.files.length;
  }
  /* Upload button functioanlity */
  onSubmitform(f: NgForm) {

    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('files', this.filedata);
    /* Image Post Request */
    this.http.post('http://localhost/api_shopping/upload_image.php', myFormData, {
      headers: headers
    }).subscribe(data => {
      //Check success message
      console.log(data);
    });

  }






  uploadResponse: any;



  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar')?.setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar')?.value);
    const headers = new HttpHeaders();

    this.http.post('http://localhost/api_shopping/upload_image.php', formData, {
      headers: headers
    }).subscribe(data => {
      //Check success message
      console.log(data);
    });
    // this.uploadService.uploadFile(formData).subscribe(
    //   (res) => {
    //     this.uploadResponse = res;
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }




  uploadImages() {

    var fd = new FormData();

    // Read selected files
    var totalfiles = this.filesAmount;
    for (var index = 0; index < totalfiles; index++) {
      // fd.append('file', this.form.get('file')?.value);
      fd.append('file', this.filedata);
      console.log(fd);
      // fd.append("files[]", document.getElementById("files").files[index]);
    }
    console.log(fd);
    this.productService.uploadImageProduct(fd).subscribe(
      (data) => {

        for (var index = 0; index < data.length; index++) {
          var img_product = data[index];
          this.images.push(img_product);
          console.log(img_product);


          var reader = new FileReader();
          let body: any
          reader.onload = (event: any) => {
            // Push Base64 string
            this.images.push({ img_product: event.target.result, product_id: this.id });
            body = event.target.files[index]
            console.log(this.images);

            // this.patchValues();
          }
          console.log(body);

          reader.readAsDataURL(body);

          // Add img element in <div id='preview'>
          // image_list.append(`
          // <tr id="${img_product}" name="${img_product}">
          //   <td>
          //   <img src="./upload/${img_product}" style="width: 150px;">
          //   </td>
          //   <td>
          //   <button class="btn btn-danger" style="background-color: #dc3545;" onclick="deleteImage('${img_product}')">ลบ</button>
          //   </td>
          // </tr>
          // `);
        }

        //   if (event.target.files && event.target.files[0]) {
        //     this.filesAmount = event.target.files.length;
        //     for (let i = 0; i < this.filesAmount; i++) {
        //       var reader = new FileReader();
        //       reader.onload = (event: any) => {
        //         // Push Base64 string
        //         this.images.push({ img_product: event.target.result, product_id: this.id });
        //         console.log(this.images);

        //         // this.patchValues();
        //       }
        //       console.log(event.target.files[i]);

        //       reader.readAsDataURL(event.target.files[i]);
        //     }
        //   }
        // }
        // if (data.status == "success") {
        //   setTimeout(function () {
        //     // window.location.replace("product.php");
        //     //console.log(product_name, product_price, product_quantity, product_description, response);
        //   }, 300);
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'กรุณาเพิ่มรูปภาพ',
        //     showConfirmButton: false,
        //     timer: 1500
        //   }).then((result) => {
        //     if (result.isDismissed) {
        //       window.history.back;
        //     }
        //   });
        // }
      }
    );

    // AJAX request
    // $.ajax({
    //   url: "upload_multiple_image.php",
    //   type: "post",
    //   data: fd,
    //   dataType: "json",
    //   contentType: false,
    //   processData: false,
    //   success: function (response) {
    //     //image_list.empty();
    //     // for (var index = 0; index < response.length; index++) {
    //     //   var img_product = response[index];
    //     //   listImage.push(img_product);
    //     //   console.log(img_product);
    //     //   // Add img element in <div id='preview'>
    //     //   image_list.append(`
    //     // <tr id="${img_product}" name="${img_product}">
    //     //   <td>
    //     //   <img src="./upload/${img_product}" style="width: 150px;">
    //     //   </td>
    //     //   <td>
    //     //   <button class="btn btn-danger" style="background-color: #dc3545;" onclick="deleteImage('${img_product}')">ลบ</button>
    //     //   </td>
    //     // </tr>
    //     // `);
    //     // }
    //   }
    // });
  };

}
