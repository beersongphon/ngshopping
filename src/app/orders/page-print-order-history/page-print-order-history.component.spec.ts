import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrintOrderHistoryComponent } from './page-print-order-history.component';

describe('PagePrintOrderHistoryComponent', () => {
  let component: PagePrintOrderHistoryComponent;
  let fixture: ComponentFixture<PagePrintOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePrintOrderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePrintOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
