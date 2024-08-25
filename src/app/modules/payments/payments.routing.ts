import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './pages/payments/payments.component';




const routes: Routes = [

  {
    path: '',
    component: PaymentsComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class paymentsRoutingModule {}
