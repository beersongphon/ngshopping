import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  id: number = 1;
  title: string = '';

  brand: any = {};

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.getEditBrand();
  }

  getEditBrand(): void {
    let body = {
      brand_id: this.id
    }
    this.productService.getEditBrand(body).subscribe({
      next: (data) => {
        this.brand = data;
        console.log(data);
      }, error: (error) => {
        console.log(error);
      }, complete: () => {
        console.log('complete');
      }
    });
  }

  // เพิ่มสินค้า
  updateBrand(formValue: any) {
    let body = {}
    body = {
      brand_id: this.id,
      brand_name: formValue.brand_name
    }
    this.productService.updateBrand(body).subscribe({
      next: (data) => {
        if (data.status == "success") {

        } else {

        }
        console.log(data);

      }, error: (error) => {
        console.log(error);
      }, complete: () => {
        console.log('complete');
      }
    });

    // .subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   }, error: (error) => {
    //     console.log(error);
    //   }, complete: () => {
    //     console.log('complete');
    //   }
    // });
  }
}