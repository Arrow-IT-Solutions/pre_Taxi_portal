import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { PaymentsComponent } from './pages/payments/payments.component';
import { paymentsRoutingModule } from './payments.routing';
import { RequestBase, ResponseBase, SearchRequestBase, TranslationBase } from 'src/app/shared/class/class';
import { DriverResponse } from '../drivers/drivers.module';



@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    paymentsRoutingModule,
    SharedModule,
    NgPrimeModule
  ]
})
export class PaymentsModule { }

export interface PaymentRequest extends RequestBase {
  //uuid?: string;
  amount?: string,
  driverIDFK?: string,
  fromMonth?: string,
  toMonth?: string,
  date?: string,
  year?: string,

}

export interface PaymentUpdateRequest extends RequestBase {
  //uuid?: string;
  amount?: string,
  driverIDFK?: string,
  fromMonth?: string,
  toMonth?: string,
  date?: string,
  year?: string
}

export interface PaymentSearchRequest extends SearchRequestBase {
  uuid?: string;
  driverIDFK?: string;
  fromDate: string;
  toDate: string;
  includeDriver?: string;
  includeMonths?: string;
}

export interface PaymentResponse extends ResponseBase {
  uuid?: string;
  amount?: string,
  driverIDFK?: string,
  month?: string,
  date?: string,
  receiptNo?: string
  driver?: DriverResponse;
  year?: string
}
