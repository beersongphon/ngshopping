import { of } from 'rxjs';
import { ComponentFixture, inject, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProfileDetailComponent } from './profile-detail.component';
import { ApiService } from './../shared/api.service';

describe('ProfileDetailComponent', () => {
  let component: ProfileDetailComponent;
  let fixture: ComponentFixture<ProfileDetailComponent>;
  let mockService: jasmine.SpyObj<ApiService>;
  let mockDataUser = {
    user_id: 1,
    user_firstname: 'นายทดสอบ',
    user_lastname: 'ระบบ',
    user_address: '185/8',
    user_email: 'test@gmail.com',
    user_tel: '0868846654'
  };

  // mockDataService = jasmine.createSpyObj(DataService.Name, {'GetEmployees': of(EMPLOYEES)});

  beforeEach(async () => {
    const mockServiceSpyObj = jasmine.createSpyObj('ApiService', ["getUser"]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,],
      declarations: [ProfileDetailComponent],
      providers: [
        { provide: ApiService, useValue: mockServiceSpyObj },
      ],
    }).compileComponents();

    mockService = TestBed.get(ApiService);
  });

  beforeEach(() => {
    mockService.getUser.and.returnValue(of(mockDataUser));
    fixture = TestBed.createComponent(ProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should getUser when apiService return correct result', fakeAsync(() => {
    // SET UP
    mockService.getUser.and.returnValue(of(mockDataUser));

    // Actual Test
    component.getUser();

    tick();

    // Assertion
    expect(component.user).toEqual(mockDataUser);
  }));
});
