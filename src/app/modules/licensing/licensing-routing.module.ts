import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicensingComponent } from './licensing/licensing.component';
import { RequestBase, ResponseBase, SearchRequestBase, TranslationBase } from 'src/app/shared/class/class';


const routes: Routes = [
  {
    path: "",
    component: LicensingComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicensingRoutingModule { }

export interface PrintReportRequest extends RequestBase {
  //uuid?: string;
  carModel?: string,
  carType?: string,
  ownerName?: string,
  fromOwnerName?: string,
  toOwnerName?: string,
  reportType?: string,
  date?: string,
  carNumber?: string
}
