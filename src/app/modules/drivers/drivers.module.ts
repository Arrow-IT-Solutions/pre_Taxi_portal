import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestBase, ResponseBase, SearchRequestBase, TranslationBase } from 'src/app/shared/class/class';
import { UserResponse } from 'src/app/modules/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { AddDriverComponent } from './pages/add-driver/add-driver.component';
import { driversRoutingModule } from './drivers.routing';
import { DriversComponent } from './pages/drivers/drivers.component';




@NgModule({
  declarations: [
    DriversComponent,
    AddDriverComponent,
  ],
  imports: [
    CommonModule,
    driversRoutingModule,
    SharedModule,
    NgPrimeModule
  ]
})
export class DriversModule { }
export interface DriverRequest extends RequestBase {
  //uuid?: string;
  driverTranslation?: DriverTranslationRequest[];
  ownerPhone?: string,
  ownerNationalID?: string,
  driverPhone?: string,
  driverNationalID?: string,
  carModel?: string,
  carNumber?: string,
  licenceExpDate?: string

}

export interface DriverUpdateRequest extends RequestBase {
  //uuid?: string;
  driverTranslation?: DriverTranslationRequest[];
  ownerPhone?: string,
  ownerNationalID?: string,
  driverPhone?: string,
  driverNationalID?: string,
  carModel?: string,
  carNumber?: string
  licenceExpDate?: string
}

export interface DriverSearchRequest extends SearchRequestBase {
  uuid?: string;
  ownerName?: string;
  phone: string;
  driverName: string;
  carNumber: string;
  carType: string
  includePayments?: string;
}

export interface DriverResponse extends ResponseBase {
  uuid?: string;
  driverTranslation?: { [key: string]: DriverTranslationResponse };
  carNumber: string;
  ownerPhone: string;
  driverPhone: string;
  ownerNationalID: string
  driverNationalID: string;
  carModel: string
  paymentCount?: string;
  licenceExpDate?: string;
  creationDate?: string
}

export interface DriverTranslationRequest {
  uuid?: string;
  ownerName?: string;
  driverName?: string;
  carType?: string;
  language?: string;
}

export interface DriverTranslationUpdateRequest {
  uuid?: string;
  name?: string;
  description?: string;
}

export interface DriverTranslationResponse {
  uuid?: string;
  ownerName?: string;
  driverName?: string;
  carType?: string;
  language?: string;
}
