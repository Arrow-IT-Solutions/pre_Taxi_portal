import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { AddDriverComponent } from './pages/add-driver/add-driver.component';
import { driversRoutingModule } from './drivers.routing';
import { DriversComponent } from './pages/drivers/drivers.component';




@NgModule({
  declarations: [
    DriversComponent,
    AddDriverComponent
  ],
  imports: [
    CommonModule,
    driversRoutingModule,
    SharedModule,
    NgPrimeModule
  ]
})
export class DriversModule { }
