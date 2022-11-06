import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  insertCategory(formValue: any) {
    let body = {}
    body = {
      category_id: formValue.category_id,
      category_name: formValue.category_name
    }
    this.productService.insertCategory(body).subscribe({
      next: (data) => {
        if (data.status == "success") {
          Swal.fire({
            icon: "success",
            title: (data.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              this.router.navigate(['/category']);
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
