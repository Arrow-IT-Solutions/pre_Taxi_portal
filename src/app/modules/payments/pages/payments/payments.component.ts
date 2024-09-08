import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PaymentRequest, PaymentResponse, PaymentUpdateRequest, PaymentSearchRequest } from '../../payments.module';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { PaymentService } from 'src/app/Core/services/payment.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationExtras, Router } from '@angular/router';
import { DriverService } from 'src/app/Core/services/driver.service';
import { DriverSearchRequest, DriverResponse } from 'src/app/modules/drivers/drivers.module';
import { from } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class PaymentsComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  invalidRange: boolean = false
  btnLoading: boolean = false;
  loading: boolean = false;
  data: PaymentResponse[] = [];
  driverTotal: number = 0;
  pageSize: number = 12;
  drivers: DriverResponse[] = [];
  totalRecords: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  fromMonths: { label: string, value: number }[] = [];
  toMonths: { label: string, value: number }[] = [];
  years: { label: string, value: string }[] = [];


  selectedFromMonth: number | null = null;
  selectedToMonth: number | null = null;
  selectedYear: number | null = null;


  isResetting: boolean = false;
  constructor(public layoutService: LayoutService, public router: Router, public paymentService: PaymentService, public messageService: MessageService, public confirmationService: ConfirmationService, public formBuilder: FormBuilder, public translate: TranslateService, public driverService: DriverService) {
    this.dataForm = this.formBuilder.group({
      driverSearch: [''],
      fromMonth: ['', Validators.required],
      toMonth: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      fromDate: [''],
      toDate: [''],
      driver: ['', Validators.required],
      year: ['', Validators.required]


    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async ngOnInit() {
    this.initializeMonths();
    await this.FillData();
    await this.RetriveClient();
  }

  Search() {
    this.FillData();
  }

  async RetriveClient() {

    var clientID = '';

    if (this.paymentService.SelectedData != null) {
      clientID = this.driverService.SelectedData?.uuid!;
    }
    else {
      if (this.paymentService.SelectedData != null) {
        //clientID = this.paymentService.SelectedData?.driver?.uuid,
      }
    }


    let filter: DriverSearchRequest = {

      ownerName: '',
      uuid: clientID,
      phone: "",
      driverName: '',
      includePayments: '0',
      carNumber: '',
      carType: '',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.driverService.Search(filter) as any

    this.drivers = response.data

  }

  initializeMonths() {
    this.fromMonths = Array.from({ length: 12 }, (v, i) => ({ label: (i + 1).toString(), value: i + 1 }));
    this.toMonths = Array.from({ length: 12 }, (v, i) => ({ label: (i + 1).toString(), value: i + 1 }));
    this.years = Array.from({ length: 12 }, (v, i) => {
      const year = (i + 2022).toString();
      return { label: year, value: year };
    });


  }

  confirmDelete(row: PaymentResponse) {

    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.paymentService.Delete(row.uuid!)) as any;

        this.confirmationService.close();

        this.layoutService.showSuccess(this.messageService, 'toste', true, response.requestMessage);

        this.FillData();

      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
    });
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;

    this.data = [];
    this.paymentService.SelectedData = null;
    this.driverTotal = 0


    const fromDate = this.dataForm.controls['fromDate'].value == '' ? '' : new Date(this.dataForm.controls['fromDate'].value.toISOString())
    const toDate = this.dataForm.controls['toDate'].value == '' ? '' : new Date(this.dataForm.controls['toDate'].value.toISOString())

    let filter: PaymentSearchRequest = {
      driverIDFK: this.dataForm.controls['driverSearch'].value == null ? '' : this.dataForm.controls['driverSearch'].value.toString(),
      fromDate: fromDate.toLocaleString(),
      toDate: toDate.toLocaleString(),
      includeDriver: '1',
      includeMonths: '0',
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString()
    };
    console.log(filter)
    const response = (await this.paymentService.Search(filter));

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

  OpenDialog(row: PaymentResponse | null = null) {

    this.paymentService.SelectedData = row;
    this.dataForm.controls['driver'].disable();


    let months = this.paymentService.SelectedData?.month

    let year = this.paymentService.SelectedData?.year



    if (typeof months == 'string' && months.length > 0) {
      let monthArray = months.split(',');
      let fromMonth = monthArray[0];
      let toMonth = monthArray[monthArray.length - 1];

      let temp = {
        driver: this.paymentService.SelectedData?.driver?.uuid,
        date: this.paymentService.SelectedData?.date,
        amount: this.paymentService.SelectedData?.amount,
        fromMonth: Number(fromMonth),
        toMonth: Number(toMonth),
        year: (year)
      };
      this.dataForm.patchValue(temp);
    }

  }

  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    let temp = {
      fromDate: '',
      toDate: '',
    };
    this.dataForm.patchValue(temp);
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
    this.FillData(event.pageIndex);
  }

  async FillClient(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: DriverSearchRequest = {

      driverName: '',
      uuid: '',
      phone: "",
      ownerName: '',
      carNumber: filterInput,
      carType: '',
      pageIndex: "",
    }
    const response = await this.driverService.Search(filter) as any

    this.drivers = response.data
  }

  async onSubmit() {
    try {
      this.btnLoading = true;

      if (this.dataForm.invalid) {
        this.submitted = true;
        return;
      }

      if (Number(this.dataForm.controls['fromMonth'].value) > Number(this.dataForm.controls['toMonth'].value)) {
        this.invalidRange = true;
        this.submitted = true
        return;
      }
      await this.Save();
      this.FillData()
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }

  async Save() {
    let response;
    let date = new Date(this.dataForm.controls['date'].value)

    if (this.paymentService.SelectedData != null) {
      // update

      var driver: PaymentUpdateRequest = {
        uuid: this.paymentService.SelectedData?.uuid?.toString(),
        driverIDFK: this.dataForm.controls['driver'].value.toString(),
        amount: this.dataForm.controls['amount'].value.toString(),
        date: date.toISOString(),
        fromMonth: this.dataForm.controls['fromMonth'].value.toString(),
        toMonth: this.dataForm.controls['toMonth'].value.toString(),
        year: this.dataForm.controls['year'].value.toString(),

      };

      response = await this.paymentService.Update(driver);
    } else {
      // add
      var payment: PaymentRequest = {
        driverIDFK: this.dataForm.controls['driver'].value.toString(),
        fromMonth: this.dataForm.controls['fromMonth'].value.toString(),
        toMonth: this.dataForm.controls['toMonth'].value.toString(),
        amount: this.dataForm.controls['amount'].value.toString(),
        date: date.toISOString(),
        year: this.dataForm.controls['year'].value.toString(),
      };
      response = await this.paymentService.Add(payment);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      this.resetForm();
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }
  resetForm() {

    this.dataForm.reset();
    this.dataForm.reset();
    let temp = {
      fromDate: '',
      toDate: '',
    };
    this.dataForm.patchValue(temp);
  }

  Print(row: PaymentResponse | null = null) {
    console.log(row)
    this.router.navigate(['receipt'], { queryParams: { id: row?.uuid } });
  }
}
