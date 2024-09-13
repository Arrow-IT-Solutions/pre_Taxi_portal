import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DriverService } from 'src/app/Core/services/driver.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { DriverRequest, DriverUpdateRequest } from '../../drivers.module';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss'],
  providers: [MessageService]

})
export class AddDriverComponent implements OnInit {

  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;

  constructor(public formBuilder: FormBuilder, public layoutService: LayoutService, public messageService: MessageService, public driverService: DriverService) {
    this.dataForm = formBuilder.group({
      ownerNameAr: [''],
      ownerNationalID: [''],
      ownerPhone: [''],
      carTypeAr: [''],
      carModel: [''],
      driverNameAr: [''],
      driverNationalID: [''],
      driverPhone: [''],
      carNumber: ['', Validators.required],
      licesnceExpDate: ['', Validators.required],


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
    let licenceExpDate = new Date(this.dataForm.controls['licesnceExpDate'].value)


    var driverTranslation = [
      {
        ownerName: this.dataForm.controls['ownerNameAr'].value == null ? '' : this.dataForm.controls['ownerNameAr'].value.toString(),
        driverName: this.dataForm.controls['driverNameAr'].value == null ? '' : this.dataForm.controls['driverNameAr'].value,
        carType: this.dataForm.controls['carTypeAr'].value == null ? '' : this.dataForm.controls['carTypeAr'].value,
        language: 'ar'
      },
      {
        ownerName: this.dataForm.controls['ownerNameAr'].value == null ? '' : this.dataForm.controls['ownerNameAr'].value.toString(),
        driverName: this.dataForm.controls['driverNameAr'].value == null ? '' : this.dataForm.controls['driverNameAr'].value,
        carType: this.dataForm.controls['carTypeAr'].value == null ? '' : this.dataForm.controls['carTypeAr'].value,
        language: 'en'
      }
    ];
    if (this.driverService.SelectedData != null) {
      // update

      var driver: DriverUpdateRequest = {
        uuid: this.driverService.SelectedData?.uuid?.toString(),
        driverTranslation: driverTranslation,
        ownerPhone: this.dataForm.controls['ownerPhone'].value == null ? '' : this.dataForm.controls['ownerPhone'].value,
        ownerNationalID: this.dataForm.controls['ownerNationalID'].value == null ? '' : this.dataForm.controls['ownerNationalID'].value,
        driverPhone: this.dataForm.controls['driverPhone'].value == null ? '' : this.dataForm.controls['driverPhone'].value,
        driverNationalID: this.dataForm.controls['driverNationalID'].value == null ? '' : this.dataForm.controls['driverNationalID'].value,
        carModel: this.dataForm.controls['carModel'].value == null ? '-1' : this.dataForm.controls['carModel'].value.toString(),
        carNumber: this.dataForm.controls['carNumber'].value == null ? '' : this.dataForm.controls['carNumber'].value,
        licenceExpDate: licenceExpDate.toISOString(),
      };

      response = await this.driverService.Update(driver);
    } else {
      // add
      var driver: DriverRequest = {
        driverTranslation: driverTranslation,
        ownerPhone: this.dataForm.controls['ownerPhone'].value == null ? '' : this.dataForm.controls['ownerPhone'].value,
        ownerNationalID: this.dataForm.controls['ownerNationalID'].value == null ? '' : this.dataForm.controls['ownerNationalID'].value,
        driverPhone: this.dataForm.controls['driverPhone'].value == null ? '' : this.dataForm.controls['driverPhone'].value,
        driverNationalID: this.dataForm.controls['driverNationalID'].value == null ? '' : this.dataForm.controls['driverNationalID'].value,
        carModel: this.dataForm.controls['carModel'].value == null ? '-1' : this.dataForm.controls['carModel'].value,
        carNumber: this.dataForm.controls['carNumber'].value == null ? '' : this.dataForm.controls['carNumber'].value,
        licenceExpDate: licenceExpDate.toISOString(),
      };

      console.log(driver)

      response = await this.driverService.Add(driver);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.driverService.SelectedData == null) {
        this.resetForm();
      } else {
        this.driverService.Dialog.close();
      }
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
    // var translateAr = this.roleService.SelectedData?.roleTranslation?.find((item) => item.language == 'ar');
    // var translateEn = this.roleService.SelectedData?.roleTranslation?.find((item) => item.language == 'en');

    let temp = {
      ownerNameAr: this.driverService.SelectedData?.driverTranslation!['ar'].ownerName,
      driverNameAr: this.driverService.SelectedData?.driverTranslation!['ar'].driverName,
      carTypeAr: this.driverService.SelectedData?.driverTranslation!['ar'].carType,
      ownerPhone: this.driverService.SelectedData?.ownerPhone,
      driverNationalID: this.driverService.SelectedData?.driverNationalID,
      driverPhone: this.driverService.SelectedData?.driverPhone,
      ownerNationalID: this.driverService.SelectedData?.ownerNationalID,
      carNumber: this.driverService.SelectedData?.carNumber,
      carModel: this.driverService.SelectedData?.carModel,
      licesnceExpDate: this.driverService.SelectedData?.licenceExpDate
    };
    this.dataForm.patchValue(temp);
  }

}
