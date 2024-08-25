import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';



@NgModule({
  declarations: [
    HomeComponent,
    CategoriesComponent,
    ProductsComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgPrimeModule
  ]
})
export class HomeModule { }
