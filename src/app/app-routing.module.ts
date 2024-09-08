import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuardService } from './Core/guard/auth-guard.service';
import { ContentLayoutAdminComponent } from './layout/content-layout-admin/content-layout-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },

  // {
  //   path: 'layout',
  //   component: ContentLayoutComponent,
  //   // canActivate: [AuthGuardService],
  //   children: [
  //     {
  //       path: 'home',
  //       loadChildren: () =>
  //         import('./modules/home/home.module').then(
  //           (m) => m.HomeModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: 'layout-admin',
    component: ContentLayoutAdminComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: 'months',
        loadChildren: () =>
          import('./modules/months/months.module').then(
            (m) => m.MonthsModule
          ),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./modules/payments/payments.module').then(
            (m) => m.PaymentsModule
          ),
      },
      {
        path: 'drivers',
        loadChildren: () =>
          import('./modules/drivers/drivers.module').then(
            (m) => m.DriversModule
          ),
      },
      {
        path: 'expiredLicenceReport',
        loadChildren: () =>
          import('./modules/reports/expiredLicenceReport.module').then(
            (m) => m.ExpiredLicenceModule
          ),
      },
    ],
  },
  {
    path: 'receipt',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/receipt/receipt.module').then(
            (m) => m.ReceiptModule
          )
      }
    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'segments',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('./modules/segments/segments.module').then(
  //       (m) => m.SegmentsModule
  //     ),
  // },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
