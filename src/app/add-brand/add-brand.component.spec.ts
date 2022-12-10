import { ComponentFixture, inject, TestBed, async, fakeAsync, tick, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { AddBrandComponent } from './add-brand.component';
import { BrandComponent } from './../brand/brand.component';
import { ProductService } from './../shared/product.service';

fdescribe('AddBrandComponent', () => {
  let component: AddBrandComponent;
  let fixture: ComponentFixture<AddBrandComponent>;
  let mockService: jasmine.SpyObj<ProductService>;
  let router: Router;
  let mockDataBrand = {
    User_ID: '3'
  };

  beforeEach(async () => {
    const mockServiceSpyObj = jasmine.createSpyObj('ProductService', ["insertBrand"]);
    await TestBed.configureTestingModule({
      imports: [FormsModule, NgxPaginationModule, HttpClientTestingModule, ReactiveFormsModule, MatRadioModule,
        RouterTestingModule.withRoutes([
          { path: 'brand', component: BrandComponent }
        ])
      ],
      declarations: [AddBrandComponent],
      providers: [
        { provide: ProductService, useValue: mockServiceSpyObj },
      ],
    }).compileComponents();

    mockService = TestBed.get(ProductService);
  });

  beforeEach(() => {
    jasmine.clock().install();

    mockService.insertBrand.and.returnValue(of({
      body: {
        status: "success",
        message: 'บันทึกข้อมูลสำเร็จ'
      }
    }));

    let mockScroll = {
      nativeElement: {
        scrollIntoView: () => { }
      }
    };
    spyOn(mockScroll.nativeElement, "scrollIntoView").and.returnValue();
    fixture = TestBed.createComponent(AddBrandComponent);
    component = fixture.componentInstance;
    // component.myScroll = mockScroll;
    fixture.detectChanges();
  });


  // it('Click Submit New MIO Success', fakeAsync(() => {
  //   mockService.insertBrand.and.returnValue(of({
  //     body: {
  //       status: "success",
  //       message: 'บันทึกข้อมูลสำเร็จ'
  //     }
  //   }));
  //   fixture.detectChanges();
  //   component.insertBrand({
  //     brand_name: 'test'
  //   });
  //   tick(50);

  //   expect(Swal.getTitle()?.textContent).toEqual('บันทึกข้อมูลเรียบร้อย');
  //   flush();
  // }));

  // it('Click Submit New MIO Update fail', fakeAsync(() => {
  //   mockService.insertBrand.and.returnValue(of({
  //     body: {
  //       status: 'error',
  //       message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
  //     }
  //   }));
  //   fixture.detectChanges();
  //   component.insertBrand({});
  //   tick(50);

  //   expect(Swal.getTitle()?.textContent).toEqual('CANNOT UPDATE DATACase ID : Test01');
  //   Swal.clickConfirm();
  //   flush();
  // }));

  it('Click Submit New MIO Update error', fakeAsync(() => {
    mockService.insertBrand.and.callFake(() => {
      return throwError({
        status: 'error',
        message: 'REQUEST_METHOD ผิดพลาด'
      });
    });
    fixture.detectChanges();
    component.insertBrand({});
    tick(50);

    expect(Swal.getTitle()?.textContent).toEqual('[object Object]');
    Swal.clickConfirm();
    flush();
  }));
});
