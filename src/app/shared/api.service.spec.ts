import { fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from './../../environments/environment';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ApiService
      ],
    });
    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should login', fakeAsync(() => {
    service.login({}).subscribe((posts: any) => {
      expect(posts.length).toBe(3);
    });
    expect(httpMock.expectOne(environment.apiUrl + '/api_login.php').request.method).toBe("POST");
    flush();
    // httpMock.verify();
  }));

  it('should userlogin', fakeAsync(() => {
    service.userlogin({}).subscribe((posts: any) => {
      expect(posts.length).toBe(3);
    });
    expect(httpMock.expectOne(environment.apiUrl + '/api_login_2.php').request.method).toBe("POST");
    flush();
    // httpMock.verify();
  }));

  it('should getUser', fakeAsync(() => {
    service.getUser().subscribe((posts: any) => {
      expect(posts.length).toBe(3);
    });
    expect(httpMock.expectOne(environment.apiUrl + '/api_show_user.php').request.method).toBe("GET");
    flush();
    // httpMock.verify();
  }));

  it('should setToken', fakeAsync(() => {
    service.setToken('1', '01');

    // httpMock.verify();
  }));

  it('should deleteToken', fakeAsync(() => {
    service.deleteToken();

    // httpMock.verify();
  }));

  it('should getUserlevel', fakeAsync(() => {
    service.getUserlevel();

    // httpMock.verify();
  }));

  it('should isLoggedIn true', fakeAsync(() => {
    service.isLoggedIn();
    service.getToken();
    expect(service.isLoggedIn()).toBeTrue;
    // httpMock.verify();
  }));

  it('should isLoggedIn false', fakeAsync(() => {
    service.isLoggedIn();
    expect(service.isLoggedIn()).toBeFalse()
    // httpMock.verify();
  }));

  it('should logout', fakeAsync(() => {
    service.logout();
    // httpMock.verify();
  }));

  // it(`should fetch posts as an Observable`, fakeAsync(inject([HttpTestingController, ApiService],
  //   (httpClient: HttpTestingController, serviceMock: ApiService) => {
  //     const postItem = [
  //       {
  //         "userId": 1,
  //         "id": 1,
  //         "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //         "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //       },
  //       {
  //         "userId": 1,
  //         "id": 2,
  //         "title": "qui est esse",
  //         "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  //       },
  //       {
  //         "userId": 1,
  //         "id": 3,
  //         "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  //         "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  //       }
  //     ];

  //     serviceMock.getOrder()
  //       .subscribe((posts: any) => {
  //         expect(posts.length).toBe(3);
  //       });
  //     let req = httpMock.expectOne(environment.apiUrl + '/api_get_order.php');
  //     expect(req.request.method).toBe("GET");
  //     req.flush(postItem);
  //     httpMock.verify();
  //   })));
});
