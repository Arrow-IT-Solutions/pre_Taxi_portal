import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeOwnerShipRoutingModule } from './change-owner-ship-routing.module';
import { OwnerShipComponent } from './owner-ship/owner-ship.component';


@NgModule({
  declarations: [
    OwnerShipComponent
  ],
  imports: [
    CommonModule,
    ChangeOwnerShipRoutingModule
  ]
})
export class ChangeOwnerShipModule { }
