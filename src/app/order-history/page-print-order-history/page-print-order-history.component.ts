import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import * as printJS from 'print-js'
// import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-page-print-order-history',
  templateUrl: './page-print-order-history.component.html',
  styleUrls: ['./page-print-order-history.component.css']
})
export class PagePrintOrderHistoryComponent implements OnInit {
  @Input() sentToPrint: Subject<object> = new Subject<object>();

  printLabelList:any = []
  printLabelListPrint:any
  disablePage = false
  numCount = 0

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sentToPrint.subscribe(result => {
      if(result){
        this.printLabelList = result
        this.disablePage = true
        this.numCount = 0

        setTimeout(async () => {
          var eGridDiv = document.querySelector<HTMLElement>('#pagePrintLabel')! as any;
          eGridDiv.style.width = '1400px';
          eGridDiv.style.height = '600px';
          let dataToPrint = []

          // for(let i = 0; i < this.printLabelList.length; i++){
          //   this.changeDetectorRef.detectChanges();
          //   dataToPrint.push(await htmlToImage.toPng(document.getElementById('pagePrintLabel')).then((data:any) => {
          //     return data
          //   }));
          //   this.numCount++
          // }

          // printJS({
          //   printable: dataToPrint,
          //   type:"image",
          //   base64:true,
          //   style: 'img {margin-top: 2mm; margin-left: 3mm;}'
          // })
          this.disablePage = false
        }, 100);
      }
    });
  }

}
