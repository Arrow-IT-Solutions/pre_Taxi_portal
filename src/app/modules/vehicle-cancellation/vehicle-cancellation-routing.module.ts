import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleCancellationComponent } from './vehicle-cancellation/vehicle-cancellation.component';

const routes: Routes = [
  {
    path:"",
    component:VehicleCancellationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleCancellationRoutingModule { }
