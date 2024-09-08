import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { RequestBase, ResponseBase, SearchRequestBase, TranslationBase } from 'src/app/shared/class/class';
import { DriverResponse } from '../drivers/drivers.module';
import { MonthsComponent } from './pages/months/months.component';
import { monthsRoutingModule } from './months.routing';



@NgModule({
  declarations: [
    MonthsComponent
  ],
  imports: [
    CommonModule,
    monthsRoutingModule,
    SharedModule,
    NgPrimeModule
  ]
})
export class MonthsModule { }

export interface MonthsRequest extends RequestBase {
  //uuid?: string;
  amount?: string,
  paymentIDFK?: string,
  month?: string,
  carNumber?: string,
  receiptNo?: string,
  year?: string,

}

export interface MonthsUpdateRequest extends RequestBase {
  //uuid?: string;
  amount?: string,
  paymentIDFK?: string,
  month?: string,
  carNumber?: string,
  receiptNo?: string,
  year?: string,
}

export interface MonthsSearchRequest extends SearchRequestBase {
  uuid?: string;
  paymentIDFK?: string;
  carNumber?: string,
  year?: string,
  month?: string,
  fromDate: string;
  toDate: string;
  includePayments?: string;
}

export interface MonthsResponse extends ResponseBase {
  uuid?: string;
  amount?: string,
  paymentIDFK?: string,
  month?: string,
  carNumber?: string,
  receiptNo?: string,
  year?: string,
  payment?: PaymentResponse;
  creationDate: string,
}
