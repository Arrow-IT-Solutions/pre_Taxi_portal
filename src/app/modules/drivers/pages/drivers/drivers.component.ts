import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DriverResponse, DriverSearchRequest, DriverUpdateRequest } from '../../drivers.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { DriverService } from 'src/app/Core/services/driver.service';
import { TranslateService } from '@ngx-translate/core';
import { ClearanceComponent } from '../clearance/clearance.component';
import { OwnershipComponent } from '../ownership/ownership.component';
import { RemoveComponent } from '../remove/remove.component';
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class DriversComponent {
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
  constructor(public layoutService: LayoutService, public driverService: DriverService, public messageService: MessageService, public confirmationService: ConfirmationService, public formBuilder: FormBuilder, public translate: TranslateService) {
    this.dataForm = this.formBuilder.group({
      ownerName: [''],
      driverName: [''],
      phone: [''],
      carNumber: [''],
      carType: ['']


    });
  }

  async ngOnInit() {
    await this.FillData();
  }

  Search() {
    this.FillData();
  }

  confirmDelete(row: DriverResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.driverService.Delete(row.uuid!)) as any;

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
    this.driverService.SelectedData = null;
    this.driverTotal = 0;

    let filter: DriverSearchRequest = {
      ownerName: this.dataForm.controls['ownerName'].value,
      driverName: this.dataForm.controls['driverName'].value,
      phone: this.dataForm.controls['phone'].value,
      carNumber: this.dataForm.controls['carNumber'].value,
      carType: this.dataForm.controls['carType'].value,
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString()
    };
    const response = (await this.driverService.Search(filter)) as any;
    console.log('Response: ', response)
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

  OpenDialog(row: DriverResponse | null = null) {

    window.scrollTo({ top: 0, behavior: 'smooth' }); // back to the top of the screen
    document.body.style.overflow = 'hidden'; // lock screen scroll

    this.driverService.SelectedData = row;

    let content = this.driverService.SelectedData == null ? 'CreateDriver_Driver' : 'UpdateDriver_Driver';
    this.translate.get(content).subscribe((res: string) => {
      content = res;
    });

    var component = this.layoutService.OpenDialog(AddDriverComponent, content);
    this.driverService.Dialog = component;

    component.OnClose.subscribe(() => {
      document.body.style.overflow = ''; // unlock screen scroll
      this.FillData();
    });
  }

  OpenClearance(row: DriverResponse | null = null) {

    window.scrollTo({ top: 0, behavior: 'smooth' }); // back to the top of the screen
    document.body.style.overflow = 'hidden'; // lock screen scroll

    this.driverService.SelectedData = row;

    let content = 'Clearance_Driver';
    this.translate.get(content).subscribe((res: string) => {
      content = res;
    });

    var component = this.layoutService.OpenDialog(ClearanceComponent, content);
    this.driverService.Dialog = component;

    component.OnClose.subscribe(() => {
      document.body.style.overflow = ''; // unlock screen scroll
      this.FillData();
    });
  }

  OpenOwnership(row: DriverResponse | null = null) {

    window.scrollTo({ top: 0, behavior: 'smooth' }); // back to the top of the screen
    document.body.style.overflow = 'hidden'; // lock screen scroll

    this.driverService.SelectedData = row;

    let content = 'Ownership_Driver';
    this.translate.get(content).subscribe((res: string) => {
      content = res;
    });

    var component = this.layoutService.OpenDialog(OwnershipComponent, content);
    this.driverService.Dialog = component;

    component.OnClose.subscribe(() => {
      document.body.style.overflow = ''; // unlock screen scroll
      this.FillData();
    });
  }

  OpenRemove(row: DriverResponse | null = null) {

    window.scrollTo({ top: 0, behavior: 'smooth' }); // back to the top of the screen
    document.body.style.overflow = 'hidden'; // lock screen scroll

    this.driverService.SelectedData = row;

    let content = 'Remove_Driver';
    this.translate.get(content).subscribe((res: string) => {
      content = res;
    });

    var component = this.layoutService.OpenDialog(RemoveComponent, content);
    this.driverService.Dialog = component;

    component.OnClose.subscribe(() => {
      document.body.style.overflow = ''; // unlock screen scroll
      this.FillData();
    });
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
