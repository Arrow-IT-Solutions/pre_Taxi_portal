import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicensingComponent } from './licensing/licensing.component';

const routes: Routes = [
  {
    path:"",
    component:LicensingComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicensingRoutingModule { }
