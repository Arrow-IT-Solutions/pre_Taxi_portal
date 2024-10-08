import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
declare var require: any;
import * as html2pdf from 'html2pdf.js'
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentResponse, PaymentUpdateRequest, PaymentSearchRequest } from '../../payments/payments.module';
import { PaymentService } from 'src/app/Core/services/payment.service';
import { PrintService, Setting } from 'src/app/layout/service/printService';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  id: any;
  date: any;
  data: PaymentResponse;
  elmentContent?:string;
  constructor(public layoutService: LayoutService,
     private route: ActivatedRoute, public paymentService: PaymentService,public printService:PrintService,public router:Router) {
  }

  async ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.id = params['id']; // Access the query parameter 'q'
      // Now you can use the 'searchTerm' in your component
    });

    this.FillData()

  }
  async FillData() {
let element=document.getElementById("CarNumber");

console.log(element?.innerText)
this.elmentContent=element?.innerHTML;


    let filter: PaymentSearchRequest = {
      uuid: this.id.toString(),
      driverIDFK: '',
      fromDate: '',
      toDate: '',
      includeDriver: '1',
      includeMonths: '0',
      pageIndex: '0',
      pageSize: '1'
    };
    const response = (await this.paymentService.Search(filter));
    if (response.data == null || response.data.length == 0) {
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data[0];
      this.date = this.data.date
      this.elmentContent=this.data.driver?.carNumber.split('-').reverse().join('-');
      console.log(this.elmentContent)
     
    }
  }

  public downloadAsPDF() {

    this.openAndPrintPDF();

  }


  // First Function: Generate PDF with html2pdf
  generatePDF() {
    var element = document.getElementById("pdfTable");

    const opt = {
      margin: [0, 0, 0, 0], // Clear all margins
      filename: 'generated.pdf', // Filename for download
      image: { type: 'jpeg', quality: 0.8 }, // Image settings
      html2canvas: { scale: 1 }, // Ensure content stays at actual size
      jsPDF: { unit: 'mm', format: 'a5', orientation: 'landscape' } // PDF in landscape orientation
    };

    // Generate the PDF and return the blob URL
    return html2pdf().from(element).set(opt).output('bloburl');
  }

  print()
  {
   
 

    const content = document.getElementById('pdfTable')?.outerHTML || '';

    console.log("Content : ",content);
    let config :Setting =
    {
      printerName : this.printService.printerConfig.printerNameReceipt1,
      unit : 'mm',
      orientation  : 'landscape',
      width:148,
      height : 210,
      copies : 2,
      paperSize : 'a5'
    }

    this.printService.Print(content,config);
   

  }
  backHome(){
   
    this.router.navigate(['layout-admin/payments']);
  }

  // Second Function: Open PDF and trigger the print dialog
  openAndPrintPDF() {
    // Generate the PDF and get the blob URL
    this.generatePDF().then(function (url) {
      // Open the PDF in a new window/tab
      var newWindow: any = window.open(url);

      // Optionally, trigger print dialog after opening the PDF
      // You can add a slight delay to ensure the PDF is loaded before print is called
      setTimeout(function () {
        newWindow.print();
      }, 1000); // Delay to let the PDF load
    });
  }

  // Call the function to generate and print the PDF

}


