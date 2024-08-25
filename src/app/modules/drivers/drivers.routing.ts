import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDriverComponent } from './pages/add-driver/add-driver.component';
import { DriversComponent } from './pages/drivers/drivers.component';





const routes: Routes = [

  {
    path: '',
    component: DriversComponent,
  },
  {
    path: 'add-driver',
    component: AddDriverComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class driversRoutingModule {}
