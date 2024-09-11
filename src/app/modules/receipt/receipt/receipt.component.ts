import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
declare var require: any;
import * as html2pdf from 'html2pdf.js'
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentResponse, PaymentUpdateRequest, PaymentSearchRequest } from '../../payments/payments.module';
import { PaymentService } from 'src/app/Core/services/payment.service';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable!: ElementRef;

  id: any;
  date: any;

  data: PaymentResponse

  constructor(public layoutService: LayoutService,
     private route: ActivatedRoute, public paymentService: PaymentService) {



  }

  async ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.id = params['id']; // Access the query parameter 'q'
      // Now you can use the 'searchTerm' in your component
    });

    this.FillData()

  }
  async FillData() {

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


