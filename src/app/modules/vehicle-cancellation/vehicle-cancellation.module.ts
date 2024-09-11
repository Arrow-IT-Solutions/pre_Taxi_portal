import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleCancellationRoutingModule } from './vehicle-cancellation-routing.module';
import { VehicleCancellationComponent } from './vehicle-cancellation/vehicle-cancellation.component';


@NgModule({
  declarations: [
    VehicleCancellationComponent
  ],
  imports: [
    CommonModule,
    VehicleCancellationRoutingModule
  ]
})
export class VehicleCancellationModule { }
