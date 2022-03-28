import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'account-admin',
        loadChildren: () => import('./account-admin/account-admin.module').then((mod) => mod.
        AccountAdminModule),
      },
      {
        path: 'booking-management',
        loadChildren: () => import('./booking-management/booking-management.module').then( (mod) => mod.BookingManagementModule),
      },
      {
        path: 'request-support',
        loadChildren: () => import ('./request-support/request-support.module').then( (mod) => mod.RequestSupportModule), 
      },
      {
        path: 'request-support',
        loadChildren: () => import ('./request-support/request-support.module').then( (mod) => mod.RequestSupportModule), 
      },
      {
        path: 'request-support',
        loadChildren: () => import ('./request-support/request-support.module').then( (mod) => mod.RequestSupportModule), 
      },
      {
        path: 'source-data-management',
        loadChildren: () => import ('./source-data-management/source-data-management.module').then( (mod) => mod.SourceDataManagementModule), 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
