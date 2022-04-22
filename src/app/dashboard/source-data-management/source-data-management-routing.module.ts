import { RoomTypeManagementComponent } from './room-type-management/room-type-management.component';
import { AccommodationManagementComponent } from './accommodation-management/accommodation-management.component';
import { SourceDataManagementComponent } from './source-data-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilityManagementComponent } from './accommodation-management/utility-management/utility-management.component';

const routes: Routes = [
  {
    path: '',
    component: SourceDataManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'accommodation',
        pathMatch: 'full',
      },
      {
        path: 'accommodation',
        loadChildren: () => import ('./accommodation-management/accommodation-management.module').then (mod => mod.AccommodationManagementModule)
      },
      {
        path: 'room-type',
        loadChildren: () => import('./room-type-management/room-type-management.module').then( mod => mod.RoomTypeManagementModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceDataManagementRoutingModule { }
