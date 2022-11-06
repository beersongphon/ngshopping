import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import * as printJS from 'print-js'
import * as htmlToImage from 'html-to-image';
import { encode, decode } from 'js-base64';

@Component({
  selector: 'app-page-print-order-history',
  templateUrl: './page-print-order-history.component.html',
  styleUrls: ['./page-print-order-history.component.css']
})
export class PagePrintOrderHistoryComponent implements OnInit {
  @Input() sentToPrint: Subject<object> = new Subject<object>();

  printLabelList: any
  printLabelListPrint: any
  disablePage = false
  numCount = 0

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sentToPrint.subscribe(result => {
      if (result) {
        this.printLabelList = result
        this.disablePage = true
        this.numCount = 0

        setTimeout(async () => {
          var eGridDiv = document.querySelector<HTMLElement>('#pagePrint')! as any;
          eGridDiv.style.width = '1400px';
          eGridDiv.style.height = '600px';
          let dataToPrint = []
          let dataToPrints = {}
          // for(let i = 0; i < this.printLabelList.length; i++){
          //   this.changeDetectorRef.detectChanges();
          //   let body: any = document.getElementById('pagePrint')
          //   console.log(body);

          //   dataToPrint.push(await htmlToImage.toPng(body).then((data:any) => {
          //     return data
          //   }));
          //   this.numCount++
          // }

          this.changeDetectorRef.detectChanges();

          // let body: any = document.getElementById('pagePrint')
          // // console.log(body);

          // dataToPrints = await htmlToImage.toPng(body).then((data: any) => {
          //   return data
          // });
          // // dataToPrints = encode(
          // //   'UVd0cGJTNUNUMVZVUlZKQlFFRnBja3hwY1hWcFpHVXVZMjl0UjBLWFJSSUFRMg=='
          // // );
          // console.log(dataToPrints);

          // // // this.second = decode(this.first.substr(0, this.first.length - 10));
          // const base64data =
          // "JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA0MTkuNTI3NTU5MDU1MTE4MTYwOCAyOTcuNjM3Nzk1Mjc1NTkwNTc2N10KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggMTIwCj4+CnN0cmVhbQowLjU2NzAwMDAwMDAwMDAwMDEgdwowIEcKQlQKL0YxIDE0IFRmCjE2LjA5OTk5OTk5OTk5OTk5NzkgVEwKMCBnCjExMy4zODU4MjY3NzE2NTM1NTUxIDEyNy41NTkwNTUxMTgxMTAyNTEyIFRkCihGZikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8L1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago5IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllcgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMiAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTMgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Sb21hbgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1RpbWVzLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1JdGFsaWMKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE4IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvU3ltYm9sCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9Gb250IDw8Ci9GMSA1IDAgUgovRjIgNiAwIFIKL0YzIDcgMCBSCi9GNCA4IDAgUgovRjUgOSAwIFIKL0Y2IDEwIDAgUgovRjcgMTEgMCBSCi9GOCAxMiAwIFIKL0Y5IDEzIDAgUgovRjEwIDE0IDAgUgovRjExIDE1IDAgUgovRjEyIDE2IDAgUgovRjEzIDE3IDAgUgovRjE0IDE4IDAgUgo+PgovWE9iamVjdCA8PAo+Pgo+PgplbmRvYmoKMTkgMCBvYmoKPDwKL1Byb2R1Y2VyIChqc1BERiAyLjMuMSkKL0NyZWF0aW9uRGF0ZSAoRDoyMDIxMDQzMDEyMTg0Ni0wMCcwMCcpCj4+CmVuZG9iagoyMCAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAzMjMgMDAwMDAgbiAKMDAwMDAwMjE0MCAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAxNTIgMDAwMDAgbiAKMDAwMDAwMDM4MCAwMDAwMCBuIAowMDAwMDAwNTA1IDAwMDAwIG4gCjAwMDAwMDA2MzUgMDAwMDAgbiAKMDAwMDAwMDc2OCAwMDAwMCBuIAowMDAwMDAwOTA1IDAwMDAwIG4gCjAwMDAwMDEwMjggMDAwMDAgbiAKMDAwMDAwMTE1NyAwMDAwMCBuIAowMDAwMDAxMjg5IDAwMDAwIG4gCjAwMDAwMDE0MjUgMDAwMDAgbiAKMDAwMDAwMTU1MyAwMDAwMCBuIAowMDAwMDAxNjgwIDAwMDAwIG4gCjAwMDAwMDE4MDkgMDAwMDAgbiAKMDAwMDAwMTk0MiAwMDAwMCBuIAowMDAwMDAyMDQ0IDAwMDAwIG4gCjAwMDAwMDIzODggMDAwMDAgbiAKMDAwMDAwMjQ3NCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIxCi9Sb290IDIwIDAgUgovSW5mbyAxOSAwIFIKL0lEIFsgPEJEMEU0QTFCRTQzQzkzOTEwNjgzNDQ3N0ZFQkEyMDk4PiA8QkQwRTRBMUJFNDNDOTM5MTA2ODM0NDc3RkVCQTIwOTg+IF0KPj4Kc3RhcnR4cmVmCjI1NzgKJSVFT0Y=";
          // printJS({
          //   printable: dataToPrints,
          //   type: "image",
          //   base64: true,
          //   // style: 'img {margin-top: 2mm; margin-left: 3mm;}'
          // })


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
          this.disablePage = false
        }, 100);
      }
    });
  }

}
