import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DriverService } from 'src/app/Core/services/driver.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { DriverRequest, DriverUpdateRequest, ReportRequest } from '../../drivers.module';

@Component({
  selector: 'app-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.scss'],
  providers: [MessageService]

})
export class OwnershipComponent implements OnInit {

  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;

  constructor(public formBuilder: FormBuilder, public layoutService: LayoutService, public messageService: MessageService, public driverService: DriverService) {
    this.dataForm = formBuilder.group({
      carTypeAr: ['', Validators.required],
      fromOwnerName: ['', Validators.required],
      carNumber: ['', Validators.required],
      date: ['', Validators.required],
      toOwnerName: ['', Validators.required]


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
    let date = new Date(this.dataForm.controls['date'].value)

    var ownership: ReportRequest = {
      carNumber: this.dataForm.controls['carNumber'].value == null ? '' : this.dataForm.controls['carNumber'].value,
      date: date.toISOString(),
    };

    response = await this.driverService.ValidatePayments(ownership);


    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
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
      fromOwnerName: this.driverService.SelectedData?.driverTranslation!['ar'].ownerName,
    };
    this.dataForm.patchValue(temp);
  }

}
