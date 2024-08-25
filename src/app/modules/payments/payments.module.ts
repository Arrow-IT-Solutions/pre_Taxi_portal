import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { PaymentsComponent } from './pages/payments/payments.component';
import { paymentsRoutingModule } from './payments.routing';



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
