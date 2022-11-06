import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrintReportSaleComponent } from './page-print-report-sale.component';

describe('PagePrintReportSaleComponent', () => {
  let component: PagePrintReportSaleComponent;
  let fixture: ComponentFixture<PagePrintReportSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePrintReportSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePrintReportSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
