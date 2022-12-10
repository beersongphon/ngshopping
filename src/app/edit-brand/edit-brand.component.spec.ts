import { ComponentFixture, inject, TestBed, async, fakeAsync, tick, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { EditBrandComponent } from './edit-brand.component';
import { BrandComponent } from './../brand/brand.component';
import { ProductService } from './../shared/product.service';

fdescribe('EditBrandComponent', () => {
  let component: EditBrandComponent;
  let fixture: ComponentFixture<EditBrandComponent>;
  let mockService: jasmine.SpyObj<ProductService>;
  let router: Router;
  let mockDataBrand = {
    brand_id: "1",
    brand_name: "Chanel"
  };

  beforeEach(async () => {
    const mockServiceSpyObj = jasmine.createSpyObj('ProductService', ["getEditBrand", "updateBrand"]);
    await TestBed.configureTestingModule({
      imports: [FormsModule, NgxPaginationModule, HttpClientTestingModule, ReactiveFormsModule, MatRadioModule,
        RouterTestingModule.withRoutes([
          { path: 'brand', component: BrandComponent }
        ])
      ],
      declarations: [EditBrandComponent],
      providers: [
        { provide: ProductService, useValue: mockServiceSpyObj },
      ],
    }).compileComponents();

    mockService = TestBed.get(ProductService);
  });

  beforeEach(() => {
    jasmine.clock().install();

    mockService.getEditBrand.and.returnValue(of({
      body: mockDataBrand
    }));

    mockService.updateBrand.and.returnValue(of({
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
    fixture = TestBed.createComponent(EditBrandComponent);
    component = fixture.componentInstance;
    // component.myScroll = mockScroll;
    fixture.detectChanges();
  });

  // it('Search Transaction by mioDocNo success',fakeAsync(() => {
  //   component.id = 1
  //   component.title = "Chanel";
  //   fixture.detectChanges();
  //   component.getEditBrand();
  //   tick(50)

  //   // expect(component.validateSearch()).toBeFalse();
  //   flush();
  // }));

  // it('Search Transaction by mioDocNo no data', fakeAsync(() => {
  //   mockService.getEditBrand.and.returnValue(of({
  //     body: {
  //       status: "error",
  //       data: []
  //     }
  //   }));

  //   component.id = 0;
  //   component.title = "Test-101";
  //   fixture.detectChanges();
  //   component.getEditBrand();
  //   tick(50)

  //   expect(Swal.getTitle()?.textContent).toEqual('ไม่มีข้อมูล Document No.');
  //   Swal.clickConfirm();
  //   flush();
  // }));


  // it('Click Submit New MIO Success', fakeAsync(() => {
  //   mockService.updateBrand.and.returnValue(of({
  //     body: {
  //       status: "success",
  //       message: 'บันทึกข้อมูลสำเร็จ'
  //     }
  //   }));
  //   fixture.detectChanges();
  //   component.updateBrand({
  //     brand_name: 'test'
  //   });
  //   tick(50);

  //   expect(Swal.getTitle()?.textContent).toEqual('บันทึกข้อมูลเรียบร้อย');
  //   flush();
  // }));

  // it('Click Submit New MIO Update fail', fakeAsync(() => {
  //   mockService.updateBrand.and.returnValue(of({
  //     body: {
  //       status: 'error',
  //       message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
  //     }
  //   }));
  //   fixture.detectChanges();
  //   component.updateBrand({});
  //   tick(50);

  //   expect(Swal.getTitle()?.textContent).toEqual('CANNOT UPDATE DATACase ID : Test01');
  //   Swal.clickConfirm();
  //   flush();
  // }));

  it('Click Submit New MIO Update error', fakeAsync(() => {
    mockService.updateBrand.and.callFake(() => {
      return throwError({
        status: 'error',
        message: 'REQUEST_METHOD ผิดพลาด'
      });
    });
    fixture.detectChanges();
    component.updateBrand({});
    tick(50);

    expect(Swal.getTitle()?.textContent).toEqual('[object Object]');
    Swal.clickConfirm();
    flush();
  }));
});
