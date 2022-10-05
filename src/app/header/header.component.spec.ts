import { of } from 'rxjs';
import { ComponentFixture, inject, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeaderComponent } from './header.component';
import { ApiService } from './../shared/api.service';
import { CartService } from './../shared/cart.service';

xdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockService: jasmine.SpyObj<ApiService>;
  let mockDataCountUser = {
    user_firstname: 'นายทดสอบ',
    user_lastname: 'ระบบ'
  }
  let mockDataCountStudent = {
    Student_ID: '3',
    Student_Name: 'นายทดสอบ ระบบ'
  }
  let mockDataCountTeacher = {
    Teacher_ID: '3',
    Teacher_Name: 'นายทดสอบ ระบบ'
  }
  let mockDataCountCourse = {
    Course_ID: '3'
  }
  let mockDataCountGroup = {
    Group_ID: '3'
  }
  let mockDataCountSubject = {
    Subject_ID: '3'
  }
  let mockDataCountInstitution = {
    Institution_ID: '3',
    Institution_Name: 'นายทดสอบ ระบบ'
  }
  let mockDataCountAddingStudent = {
    Add_With_ID: '3'
  }
  let mockDataCountTransferStudent = {
    Transfer_ID: '3',
    Transfer_Name: 'ระบบสารสนเทศ',
    Transfer_Credit: '3'
  }
  let mockDataCountAddingTeacher = {
    Add_With_ID: '3'
  }
  let mockDataCountSubjectInstitution = {
    Subject_Ins_ID: '3',
    Subject_Ins_Name: 'ระบบสารสนเทศ',
    Subject_Ins_Credit: '3'
  }
  // mockDataService = jasmine.createSpyObj(DataService.Name, {'GetEmployees': of(EMPLOYEES)});

  beforeEach(async () => {
    const mockServiceSpyObj = jasmine.createSpyObj('ApiService', ["getUser", "getCountStudent", "getCountTeacher", "getCountCourse", "getCountGroup", "getCountSubject", "getCountInstitution", "getCountAddingStudent", "getCountTransferStudent", "getCountAddingTeacher", "getCountSubjectInstitution"]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,],
      declarations: [HeaderComponent],
      providers: [
        { provide: ApiService, useValue: mockServiceSpyObj },
      ],
    }).compileComponents();

    mockService = TestBed.get(ApiService)
  });

  beforeEach(() => {
    mockService.getUser.and.returnValue(of(mockDataCountUser));
    // mockService.getCountStudent.and.returnValue(of(mockDataCountStudent));
    // mockService.getCountTeacher.and.returnValue(of(mockDataCountTeacher));
    // mockService.getCountCourse.and.returnValue(of(mockDataCountCourse));
    // mockService.getCountGroup.and.returnValue(of(mockDataCountGroup));
    // mockService.getCountSubject.and.returnValue(of(mockDataCountSubject));
    // mockService.getCountInstitution.and.returnValue(of(mockDataCountInstitution));
    // mockService.getCountAddingStudent.and.returnValue(of(mockDataCountAddingStudent));
    // mockService.getCountTransferStudent.and.returnValue(of(mockDataCountTransferStudent));
    // mockService.getCountAddingTeacher.and.returnValue(of(mockDataCountAddingTeacher));
    // mockService.getCountSubjectInstitution.and.returnValue(of(mockDataCountSubjectInstitution));
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should isAailable', () => {
  //   component.doctor = { status: 'active' }
  //   spyOn(component, 'getAdding');

  //   const res = component.isAailable();

  //   expect(component.getAdding).toHaveBeenCalled();
  //   expect(res).toBeTrue();
  // });

  // it('should isAailable', () => {
  //   component.doctor = { status: 'inactive' }
  //   spyOn(component, 'getAdding');

  //   const res = component.isAailable();

  //   expect(component.getAdding).toHaveBeenCalled();
  //   expect(res).toBeFalse();
  // });

  it('should getUser when apiService return correct result', fakeAsync(() => {
    // SET UP
    mockService.getUser.and.returnValue(of(mockDataCountUser));

    // Actual Test
    component.getUser();

    tick()

    // Assertion
    expect(component.name).toEqual(mockDataCountUser);
  }));

  // it('should getCountStudent when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountStudent.and.returnValue(of(mockDataCountStudent));

  //   // Actual Test
  //   component.getCountStudent();

  //   tick()

  //   // Assertion
  //   expect(component.student).toEqual(mockDataCountStudent);
  // }));

  // it('should getCountTeacher when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountTeacher.and.returnValue(of(mockDataCountTeacher));

  //   // Actual Test
  //   component.getCountTeacher();

  //   tick()

  //   // Assertion
  //   expect(component.teacher).toEqual(mockDataCountTeacher);
  // }));

  // it('should getCountCourse when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountCourse.and.returnValue(of(mockDataCountCourse));

  //   // Actual Test
  //   component.getCountCourse();

  //   tick()

  //   // Assertion
  //   expect(component.course).toEqual(mockDataCountCourse);
  // }));

  // it('should getCountCourse when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountCourse.and.returnValue(of(mockDataCountCourse));

  //   // Actual Test
  //   component.getCountCourse();

  //   tick()

  //   // Assertion
  //   expect(component.course).toEqual(mockDataCountCourse);
  // }));

  // it('should getCountGroup when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountGroup.and.returnValue(of(mockDataCountGroup));

  //   // Actual Test
  //   component.getCountGroup();

  //   tick()

  //   // Assertion
  //   expect(component.subjectgroup).toEqual(mockDataCountGroup);
  // }));

  // it('should getCountSubject when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountSubject.and.returnValue(of(mockDataCountSubject));

  //   // Actual Test
  //   component.getCountSubject();

  //   tick()

  //   // Assertion
  //   expect(component.subject).toEqual(mockDataCountSubject);
  // }));

  // it('should getCountInstitution when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountInstitution.and.returnValue(of(mockDataCountInstitution));

  //   // Actual Test
  //   component.getCountInstitution();

  //   tick()

  //   // Assertion
  //   expect(component.institution).toEqual(mockDataCountInstitution);
  // }));

  // it('should getCountAddingStudent when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountAddingStudent.and.returnValue(of(mockDataCountAddingStudent));

  //   // Actual Test
  //   component.getCountAddingStudent();

  //   tick()

  //   // Assertion
  //   expect(component.adding).toEqual(mockDataCountAddingStudent);
  // }));

  // it('should getCountTransferStudent when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountTransferStudent.and.returnValue(of(mockDataCountTransferStudent));

  //   // Actual Test
  //   component.getCountTransferStudent();

  //   tick()

  //   // Assertion
  //   expect(component.transfer).toEqual(mockDataCountTransferStudent);
  // }));

  // it('should getCountAddingTeacher when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountAddingTeacher.and.returnValue(of(mockDataCountAddingTeacher));

  //   // Actual Test
  //   component.getCountAddingTeacher();

  //   tick()

  //   // Assertion
  //   expect(component.addings).toEqual(mockDataCountAddingTeacher);
  // }));

  // it('should getCountSubjectInstitution when apiService return correct result', fakeAsync(() => {
  //   // SET UP
  //   mockService.getCountSubjectInstitution.and.returnValue(of(mockDataCountSubjectInstitution));

  //   // Actual Test
  //   component.getCountSubjectInstitution();

  //   tick()

  //   // Assertion
  //   expect(component.subjectinstitution ).toEqual(mockDataCountSubjectInstitution);
  // }));

  // it('should return first, second, third', () => {
  //   spyOn(httpClientSpy, 'get').and.returnValue(Observable.of(mockDataCountUser));
  //   // randomService. <your get method here...>
  //   randomService.getValue().subscribe((response) =>
  //     expect(resposne[0].length).toEqual(3);
  // };
});
