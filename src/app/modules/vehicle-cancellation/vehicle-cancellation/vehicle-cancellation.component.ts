import { Component, ElementRef, ViewChild } from '@angular/core';
import * as html2pdf from 'html2pdf.js'
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { PrintService, Setting } from 'src/app/layout/service/printService';
@Component({
  selector: 'app-vehicle-cancellation',
  templateUrl: './vehicle-cancellation.component.html',
  styleUrls: ['./vehicle-cancellation.component.scss']
})
export class VehicleCancellationComponent {
  @ViewChild('pdfTable') pdfTable!: ElementRef;

  carType: any
  date: any
  ownerName: any
  carNumber: any
  reportNo: any
  elmentContent?:string;

  constructor(public layoutService: LayoutService,
    private route: ActivatedRoute,public printService:PrintService,public router: Router) {



  }


  async ngOnInit() {
    let element=document.getElementById("CarNumber");

    console.log(element?.innerText)
    this.elmentContent=element?.innerHTML;

    this.route.queryParams.subscribe(params => {
      this.carType = params['carType'];
      this.carNumber = params['carNumber'].split('-').reverse().join('-'); // Access the query parameter 'q'
      this.ownerName = params['ownerName']; // Access the query parameter 'q'
      this.date = params['date']; // Access the query parameter 'q'
      this.reportNo = params['reportNo']; // Access the query parameter 'q'

    });

  }
  print(){
    const content = document.getElementById('pdfTable')?.outerHTML || '';

    console.log("Content : ",content);


    let config :Setting =
    {
      printerName : this.printService.printerConfig.printerNameReceipt1,
      unit : 'mm',
      orientation  : 'portrait',
      width:210,
      height : 297,
      copies : 1,
      paperSize : 'A4'
    }

    this.printService.Print(content,config);

  }
  backHome(){
   
    this.router.navigate(['layout-admin/drivers']);
  }


  public downloadAsPDF() {


    this.openAndPrintPDF();
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
      var newWindow: any = window.open(url);

      // Optionally, trigger print dialog after opening the PDF
      // You can add a slight delay to ensure the PDF is loaded before print is called
      setTimeout(function () {
        newWindow.print();
      }, 1000); // Delay to let the PDF load
    });
  }

}
