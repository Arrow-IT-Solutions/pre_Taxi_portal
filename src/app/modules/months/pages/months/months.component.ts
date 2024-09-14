import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MonthsResponse, MonthsSearchRequest } from '../../months.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { MonthService } from 'src/app/Core/services/month.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class MonthsComponent {
  dataForm!: FormGroup;
  loading = false;
  data: MonthsResponse[] = [];
  monthTotal: number = 0;
  pageSize: number = 12;
  totalRecords: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  constructor(public layoutService: LayoutService, public monthService: MonthService, public messageService: MessageService, public confirmationService: ConfirmationService, public formBuilder: FormBuilder, public translate: TranslateService) {
    this.dataForm = this.formBuilder.group({
      year: [''],
      carNumber: [''],
      month: [''],
      fromDate: [''],
      toDate: ['']
    });
  }

  async ngOnInit() {
    await this.FillData();
  }

  Search() {
    this.FillData();
  }

  confirmDelete(row: MonthsResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.monthService.Delete(row.uuid!)) as any;

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
    this.monthService.SelectedData = null;
    this.monthTotal = 0;

    const fromDate = this.dataForm.controls['fromDate'].value == '' ? '' : new Date(this.dataForm.controls['fromDate'].value.toISOString())
    const toDate = this.dataForm.controls['toDate'].value == '' ? '' : new Date(this.dataForm.controls['toDate'].value.toISOString())

    let filter: MonthsSearchRequest = {
      carNumber: this.dataForm.controls['carNumber'].value,
      year: this.dataForm.controls['year'].value,
      month: this.dataForm.controls['month'].value,
      fromDate: fromDate.toLocaleString(),
      toDate: toDate.toLocaleString(),
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString()
    };
    const response = (await this.monthService.Search(filter)) as any;

    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.monthTotal = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.monthTotal = response.data[0];
    }

    this.totalRecords = response.totalRecords;

    this.loading = false;
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
    this.pageSize = event.rows
    this.FillData(event.first);
  }
}
