import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrintReportProductComponent } from './page-print-report-product.component';

describe('PagePrintReportProductComponent', () => {
  let component: PagePrintReportProductComponent;
  let fixture: ComponentFixture<PagePrintReportProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePrintReportProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePrintReportProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
