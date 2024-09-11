import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicensingRoutingModule } from './licensing-routing.module';
import { LicensingComponent } from './licensing/licensing.component';


@NgModule({
  declarations: [
    LicensingComponent
  ],
  imports: [
    CommonModule,
    LicensingRoutingModule
  ]
})
export class LicensingModule { }
