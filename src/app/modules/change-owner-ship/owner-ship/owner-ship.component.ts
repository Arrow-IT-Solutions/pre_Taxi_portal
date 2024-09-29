import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js'
import { LayoutService } from 'src/app/layout/service/layout.service';
import { PrintService, Setting } from 'src/app/layout/service/printService';

@Component({
  selector: 'app-owner-ship',
  templateUrl: './owner-ship.component.html',
  styleUrls: ['./owner-ship.component.scss']
})
export class OwnerShipComponent {
  
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  carType: any
  date: any
  fromOwnerName: any
  toOwnerName: any
  carNumber: any
  reportNo: any
  constructor(public layoutService: LayoutService,
    private route: ActivatedRoute,public printService:PrintService,public router:Router) {
  }
  async ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.carType = params['carType'];
      this.carNumber = params['carNumber']; // Access the query parameter 'q'
      this.fromOwnerName = params['fromOwnerName']; // Access the query parameter 'q'
      this.toOwnerName = params['toOwnerName']; // Access the query parameter 'q'
      this.date = params['date']; // Access the query parameter 'q'
      this.reportNo = params['reportNo']; // Access the query parameter 'q'

    });

    this.GetReportNo();

  }
  GetReportNo() {

  }
  print(){
    const content = document.getElementById('pdfTable')?.outerHTML || '';

    console.log("Content : ",content);


    let config :Setting =
    {
      printerName : this.printService.printerConfig.printerNameReceipt1,
      unit : 'in',
      orientation  : 'landscape',
      width:210,
      height : 148,
      copies : 1,
      paperSize : 'letter'
    }

    this.printService.Print(content,config);

  }
  backHome(){
   
    this.router.navigate(['layout-admin/drivers']);
  }
  
  public downloadAsPDF() {
   

    this.openAndPrintPDF();

    console.log('HERE')
  }
  generatePDF() {
    var element = document.getElementById("pdfTable");
  
    const opt = {
      margin: [0, 0, 0, 0], // Clear all margins
      filename: 'generated.pdf', // Filename for download
      image: { type: 'jpeg', quality: 0.8 }, // Image settings
      html2canvas: { scale: 1 }, // Ensure content stays at actual size
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // PDF in landscape orientation
    };
  
    // Generate the PDF and return the blob URL
    return html2pdf().from(element).set(opt).output('bloburl');
  }
  openAndPrintPDF() {
    // Generate the PDF and get the blob URL
    this.generatePDF().then(function (url) {
      // Open the PDF in a new window/tab
      var newWindow : any = window.open(url);
  
      // Optionally, trigger print dialog after opening the PDF
      // You can add a slight delay to ensure the PDF is loaded before print is called
      setTimeout(function() {
        newWindow.print();
      }, 1000); // Delay to let the PDF load
    });
  }

}
