import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: any[] = [];
  image: any[] = [];
  pageNo: object | undefined;
  sub: Subscription | undefined;

  search: string = "";

  currentPage: number = 1;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    let body = { txtSearch: this.search }
    this.sub = this.productService.getCategory(body).subscribe({
      next: (data) => {
        this.category = this.addPageNo(data);
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

  addPageNo(item: any) {
    for (let i = 0; i < item.length; i++) {
      this.pageNo = {
        "pageNo": i + 1
      }
      item[i] = Object.assign(item[i], this.pageNo);
    }
    return item;
  }

  deleteCategory(id: any) {
    let body = {}
    body = {
      category_id: id,
    }
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
        this.productService.deleteCategory(body).subscribe({
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
                  this.getCategory();
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
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
