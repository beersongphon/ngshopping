import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  id: number = 1;
  title: string = '';

  category: any = {};

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.getEditCategory();
  }

  getEditCategory(): void {
    let body = {
      category_id: this.id
    }
    this.productService.getEditCategory(body).subscribe({
      next: (data) => {
        this.category = data;
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  // เพิ่มสินค้า
  updateCategory(formValue: any) {
    let body = {}
    body = {
      category_id: this.id,
      category_name: formValue.category_name
    }
    this.productService.updateCategory(body).subscribe({
      next: (data) => {
        if (data.status == "success") {

        } else {

        }
      }, error: (error) => {
        console.log(error);
      }
    });
  }
}
