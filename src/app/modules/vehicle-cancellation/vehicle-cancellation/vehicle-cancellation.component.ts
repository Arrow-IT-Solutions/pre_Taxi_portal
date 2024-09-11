import { Component, ElementRef, ViewChild } from '@angular/core';
import * as html2pdf from 'html2pdf.js'
@Component({
  selector: 'app-vehicle-cancellation',
  templateUrl: './vehicle-cancellation.component.html',
  styleUrls: ['./vehicle-cancellation.component.scss']
})
export class VehicleCancellationComponent {
  constructor(){}
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  
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
