import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../../environments/environment';

export interface Users {
  User_ID: number;
  User_Name: string;
  Email: string;
  Password: string;
  Userlevel_ID: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  redirectUrl: string | undefined;
  //registerUrl: string = "http://localhost/api/register.php";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  //สร้าง function สำหรับเข้าสู่ระบบ
  login(loginForm: any): Observable<any> {
    const loginHeader = { 'Content-Type': 'application/json' };
    const body = {
      'username': loginForm.username,
      'password': loginForm.password
    };
    return this.http.post<any>(environment.apiUrl + '/api_login.php', body, { headers: loginHeader }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  userlogin(loginForm: any): Observable<any> {
    const loginHeader = { 'Content-Type': 'application/json' };
    const body = {
      'username': loginForm.username,
      'password': loginForm.password
    };
    return this.http.post<any>(environment.apiUrl + '/api_login_2.php', body, { headers: loginHeader }).pipe(
      map(
        (Users) => {
          this.setToken(Users[0].User_ID, Users[0].Userlevel_ID);
          this.getLoggedInName.emit(true);
          return Users;
        }
      )
    );
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  getUser(): Observable<any> {
    const apiHeader = { 'Authorization': '' + this.getToken() };
    return this.http.get<any>(environment.apiUrl + '/api_show_user.php', { headers: apiHeader });
  }

  getUsers(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_user.php', formValue, { headers: apiHeader });
  }

  insertUser(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_insert_user.php', formValue, { headers: apiHeader });
  }

  updateUser(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.put<any>(environment.apiUrl + '/api_update_user.php', formValue, { headers: apiHeader });
  }

  deleteUser(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_delete_user.php', formValue, { headers: apiHeader });
  }

  //token
  setToken(token: string, Userlevel_ID: string) {
    // localStorage.setItem('token', JSON.stringify(token));
    // localStorage.setItem('userlevel_id', JSON.stringify(Userlevel_ID));
    localStorage.setItem('token', token);
    localStorage.setItem('userlevel_id', Userlevel_ID);
  }

  //รับค่า token
  getToken() {
    return localStorage.getItem('token');
    // return JSON.parse(localStorage.getItem('data') || '{}');
  }

  //ลบค่า token
  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userlevel_id');
  }

  //รับค่า Userlevel
  getUserlevel() {
    return localStorage.getItem('userlevel_id');
  }

  //เช็ค token
  isLoggedIn(): boolean {
    const token = this.getToken();
    console.log(token);
    if (token != null) {
      return true
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
  }
}
