import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestBase, ResponseBase, SearchRequestBase, TranslationBase } from 'src/app/shared/class/class';
import { UserResponse } from 'src/app/modules/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { expiredLicenceRoutingModule } from './expiredLicence.routing';
import { ExpiredLicenceComponent } from '../reports/pages/expiredLicence/expiredLicence.component';




@NgModule({
  declarations: [
    ExpiredLicenceComponent,
  ],
  imports: [
    CommonModule,
    expiredLicenceRoutingModule,
    SharedModule,
    NgPrimeModule
  ]
})
export class ExpiredLicenceModule { }
