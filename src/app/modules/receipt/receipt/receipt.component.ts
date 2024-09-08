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

  constructor(public layoutService: LayoutService, private route: ActivatedRoute, public paymentService: PaymentService) {



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
    var element = document.getElementById("pdfTable");
    const opt = {
      margin: 10, // Millimeter margin
      filename: 'generated.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 }, // Ensure content stays at actual size
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' } // Letter size paper (215.9mm x 279.4mm)
    };

    html2pdf().from(element).toPdf(opt).get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank');
    });

    console.log('HERE')
  }
}

