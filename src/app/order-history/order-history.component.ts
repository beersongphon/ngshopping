import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {

  order: any[] = [];
  image: any[] = [];
  pageNo: object = {};
  sub: Subscription = new Subscription;

  currentPage: number = 1;

  sentToPrint: Subject<object> = new Subject<object>();

  constructor(private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory(): void {
    let body = { user_id: localStorage.getItem('token') };
    this.sub = this.productService.getOrderHistory(body).subscribe(
      (orders) => {
        // this.product = products;
        this.order = this.addPageNo(orders);
      }
    );
  }

  addPageNo(item: any) {
    for (let i = 0; i < item.length; i++) {
      this.pageNo = {
        "pageNo": i + 1
      }
      item[i] = Object.assign(item[i], this.pageNo);
    }
    return item;
  }

  clickPrintLabel(){
    // this.SpinnerService.show()
    // let listToPrint = []
    // let num = 0
    // for (let i = 0; i < this.chbSelect.length; i++) {
    //   if (this.chbSelect[i] == true) {
    //     listToPrint[num] = JSON.parse(JSON.stringify(this.tableListPrintLabel[i]));
    //     num++
    //   }
    // }
    // if(listToPrint.length == 0){
    //   this.objAlert = fn_get_Alert_Error('กรุณาระบุรายการที่ต้องการพิมพ์')
    //   Swal.fire(this.objAlert)

    // }else{
    //   for (let i = 0; i < listToPrint.length; i++) {
    //     listToPrint[i].custName = listToPrint[i].custName.split(' ')[0] + " xxxxx";
    //     listToPrint[i].contactPhone1 = markDataPrivacy(listToPrint[i].contactPhone1,'tel')

    //   }
    //   this.sentToPrint.next(listToPrint)

    // }

    // this.SpinnerService.hide()
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
