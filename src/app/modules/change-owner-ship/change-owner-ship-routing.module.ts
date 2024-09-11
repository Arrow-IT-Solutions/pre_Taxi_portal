import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerShipComponent } from './owner-ship/owner-ship.component';

const routes: Routes = [ 
  {
    path:'',
    component:OwnerShipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeOwnerShipRoutingModule { }
