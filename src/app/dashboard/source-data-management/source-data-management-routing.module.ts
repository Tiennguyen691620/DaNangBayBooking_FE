import { RoomTypeManagementComponent } from './room-type-management/room-type-management.component';
import { AccommodationManagementComponent } from './accommodation-management/accommodation-management.component';
import { SourceDataManagementComponent } from './source-data-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomManagementComponent } from './room-management/room-management.component';
import { UtilityManagementComponent } from './utility-management/utility-management.component';

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
        component: AccommodationManagementComponent,
      },
      {
        path: 'room',
        component: RoomManagementComponent,
      },
      {
        path: 'room-type',
        loadChildren: () => import('./room-type-management/room-type-management.module').then( mod => mod.RoomTypeManagementModule),
      },
      {
        path: 'utility',
        component: UtilityManagementComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceDataManagementRoutingModule { }
