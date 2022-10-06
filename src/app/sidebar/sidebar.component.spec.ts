import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { SidebarComponent } from './sidebar.component';
import { HomeComponent } from './../home/home.component';
import { ApiService } from './../shared/api.service';

xdescribe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;
  let mockService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const mockServiceSpyObj = jasmine.createSpyObj('ApiService', ["logout"]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [SidebarComponent, HomeComponent],
      providers: [
        { provide: ApiService, useValue: mockServiceSpyObj },
      ],
    }).compileComponents();

    mockService = TestBed.get(ApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router)
    // spyOn(router, "navigate")
  });

  it('should to logout', () => {
    // router = TestBed.get(Router)
    spyOn(router, "navigate");
    component.logout();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  });
});
