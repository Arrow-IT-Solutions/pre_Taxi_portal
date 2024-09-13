import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DriverService } from 'src/app/Core/services/driver.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { DriverRequest, DriverUpdateRequest, ReportRequest } from '../../drivers.module';
import { NavigationExtras, Router } from '@angular/router';
import { ReportService } from 'src/app/Core/services/report.service';
import { PrintReportRequest } from 'src/app/modules/licensing/licensing-routing.module';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss'],
  providers: [MessageService]

})
export class RemoveComponent implements OnInit {

  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;

  constructor(public formBuilder: FormBuilder, public router: Router, public layoutService: LayoutService, public messageService: MessageService, public driverService: DriverService, public reportService: ReportService) {
    this.dataForm = formBuilder.group({
      carTypeAr: ['', Validators.required],
      ownerName: ['', Validators.required],
      carNumber: ['', Validators.required],
      date: ['', Validators.required],


    });
  }

  async ngOnInit() {
    try {
      this.loading = true;

      this.resetForm();

      if (this.driverService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async onSubmit() {
    try {
      this.btnLoading = true;



      if (this.dataForm.invalid) {
        this.submitted = true;
        return;
      }
      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }

  async Save() {

    let response;
    let reportResponse;

    let date = new Date(this.dataForm.controls['date'].value)



    var remove: ReportRequest = {
      carNumber: this.dataForm.controls['carNumber'].value == null ? '' : this.dataForm.controls['carNumber'].value,
      date: date.toISOString(),
    };

    let ownerName = this.dataForm.controls['ownerName'].value
    let carType = this.dataForm.controls['carTypeAr'].value

    response = await this.driverService.ValidatePayments(remove);

    var report: PrintReportRequest = {
      carNumber: remove.carNumber,
      date: date.toISOString(),
      carType: carType,
      ownerName: ownerName,
      reportType: "3"
    };

    reportResponse = await this.reportService.Add(report)

    let reportNo = reportResponse.reportNo


    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      this.router.navigate(['cancle'], {
        queryParams: {
          carNumber: remove?.carNumber,
          carType: carType,
          date: remove.date,
          ownerName: ownerName,
          reportNo: reportNo
        }
      });
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {

    let temp = {
      carTypeAr: this.driverService.SelectedData?.driverTranslation!['ar'].carType,
      carNumber: this.driverService.SelectedData?.carNumber,
      ownerName: this.driverService.SelectedData?.driverTranslation!['ar'].ownerName,
    };
    this.dataForm.patchValue(temp);
  }

}
