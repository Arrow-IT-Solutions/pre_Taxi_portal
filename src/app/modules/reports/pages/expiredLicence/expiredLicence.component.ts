import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DriverResponse, DriverSearchRequest } from 'src/app/modules/drivers/drivers.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { ReportService } from 'src/app/Core/services/report.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-drivers',
  templateUrl: './ExpiredLicence.component.html',
  styleUrls: ['./ExpiredLicence.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ExpiredLicenceComponent {
  dataForm!: FormGroup;
  loading = false;
  data: DriverResponse[] = [];
  driverTotal: number = 0;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  constructor(public layoutService: LayoutService, public reportService: ReportService, public messageService: MessageService, public confirmationService: ConfirmationService, public formBuilder: FormBuilder, public translate: TranslateService) {
    this.dataForm = this.formBuilder.group({

    });
  }

  async ngOnInit() {

    await this.FillData();
  }

  Search() {
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;

    this.data = [];
    this.reportService.SelectedData = null;
    this.driverTotal = 0;

    let filter: DriverSearchRequest = {
      ownerName: '',
      driverName: '',
      phone: '',
      carNumber: '',
      carType: '',
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString()
    };
    const response = (await this.reportService.ExpiredLicenceReport(filter)) as any;
    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.driverTotal = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.driverTotal = response.data[0];
    }

    this.totalRecords = response.totalRecords;

    this.loading = false;
  }

  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }

  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }

  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first);
  }

}
