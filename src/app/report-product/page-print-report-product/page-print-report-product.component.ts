import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import * as printJS from 'print-js'
import * as htmlToImage from 'html-to-image';
import { encode, decode } from 'js-base64';

@Component({
  selector: 'app-page-print-report-product',
  templateUrl: './page-print-report-product.component.html',
  styleUrls: ['./page-print-report-product.component.css']
})
export class PagePrintReportProductComponent implements OnInit {
  @Input() sentToPrint: Subject<object> = new Subject<object>();

  printList: any
  printListPrint: any
  disablePage = false
  numCount = 0
  product_quantity: any

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sentToPrint.subscribe(result => {
      if (result) {
        this.printList = result

        this.disablePage = true
        this.numCount = 0

        setTimeout(async () => {
          // for (let i = 0; i < this.printList.length; i++) {
          //   this.product_quantity += this.printList[i].product_quantity;
          //   console.log(this.product_quantity);


          // }

          // var eGridDiv = document.querySelector<HTMLElement>('#pagePrint')! as any;
          // eGridDiv.style.width = '1400px';
          // eGridDiv.style.height = '600px';
          // let dataToPrint = []

          // for (let i = 0; i < this.printList.length; i++) {
          //   this.changeDetectorRef.detectChanges();
          //   let body: any = document.getElementById('pagePrint')
          //   console.log(body);
          //   dataToPrint.push(await htmlToImage.toPng(body).then((data) => {
          //     return data
          //   }));
          //   console.log(dataToPrint);

          //   // var sTable = document.getElementById('pagePrint')?.innerHTML;
          //   // console.log(sTable);

          //   this.numCount++
          // }


          var sTable = document.getElementById('pagePrint')?.innerHTML;
          var style = "<style>";
          style = style + "body {font-family: 'Garuda'}";
          style = style + ".order-container { font-family: Tahoma, Geneva, sans-serif; margin: 0px auto; width: 950px; font-size: 14px;}";
          style = style + ".order-head {margin: 50px 0 10px 0;}";
          style = style + ".order-title {text-align: center;font-size: 24px;font-weight: bold;}";
          style = style + ".order-head .order-customer {float: left;margin: 10px 0 10px 0;padding: 5px;border: 1px solid #000;}";
          style = style + ".order-head .order-date {text-align: right;margin: 10px 0 10px 0;float: right;padding: 5px;border: 1px solid #000;}";
          style = style + ".order-underline {border-bottom: #000 1px dashed;}";
          style = style + ".clear {clear: both;}";
          style = style + "</style>";

          // CREATE A WINDOW OBJECT.
          var win: any = window.open('', '', 'height=700,width=700');

          win.document.write('<html><head>');
          // win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
          win.document.write('<title></title>');
          win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
          win.document.write('</head>');
          win.document.write('<body>');
          win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
          win.document.write('</body></html>');

          win.document.close(); 	// CLOSE THE CURRENT WINDOW.

          win.print();    // PRINT THE CONTENTS.

          // printJS({
          //   printable: dataToPrint,
          //   type: "image",
          //   base64: true,
          //   style: 'img {margin-top: 2mm; margin-left: 3mm;}'
          // })
          this.disablePage = false
        }, 100);
      }
    });
  }

  subTotal(): number {
    return this.calculateSubTotal(this.printList);
  }

  calculateSubTotal(printList: any) {
    let sum = 0;
    for (let selection of printList) {
      sum += selection.product_quantity;
    }

    return sum;
  }

}
