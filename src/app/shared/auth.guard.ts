import { Injectable } from '@angular/core';
// import ส่วนที่จะใช้งาน guard เช่น CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree เป็นต้นมาใช้งาน
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// import ในส่วนที่จะใช้งานกับ Observable
import { Observable } from 'rxjs';
// import service ที่เช็คสถานะการล็อกอินมาใช้งาน
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // inject ApiService และ Router
  constructor(private apiService: ApiService, private router: Router) {}

  // กำนหนด guard ในส่วนของการใช้งานกับ  canActivate
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeurl: string = state.url; // เก็บ routeurl ที่พยายามจะเข้าใช้งาน
    // จะผ่านเข้าใช้งานได้เมื่อ คืนค่าเป็น true โดยเข้าไปเช็คค่าจากคำสั่ง isLogin()
    return this.isLogin(routeurl); // คืนค่าการตรวจสอบสถานะการล็อกอิน
  }

  // ฟังก์ชั่นเช็คสถานะการล็อกอิน รับค่า routeurl ที่ผู้ใช้พยายามจะเข้าใช้งาน
  isLogin(routeurl: string): boolean {
    // ถ้าตรวจสอบค่าสถานะการล็อกอินแล้วเป็น true ก็ให้คืนค่า true กลับอกไป
    if (this.apiService.isLoggedIn()) {
      return true;
    }
    // แต่ถ้ายังไม่ได้ล็อกอิน ให้เก็บ routeurl ที่พยายามจะเข้าใช้งาน สำหรับไว้ลิ้งค์เปลี่ยนหน้า
    this.apiService.redirectUrl = routeurl; // redirectUrl เป็นตัวแปรที่อยู่ใน apiService
    // ลิ้งค์ไปยังหน้าล็อกอิน เพื่อล็อกอินเข้าใช้งานก่อน
    this.router.navigate(['/login'], { queryParams: { returnUrl: routeurl }} );
    return false; // คืนค่า false กรณียังไม่ได้ล็อกอิน
  }
}
