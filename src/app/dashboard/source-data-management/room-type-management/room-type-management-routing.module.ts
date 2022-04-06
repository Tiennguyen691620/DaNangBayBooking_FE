import { RoomTypeManagementEditComponent } from './room-type-management-edit/room-type-management-edit.component';
import { RoomTypeManagementCreateComponent } from './room-type-management-create/room-type-management-create.component';
import { RoomTypeManagementListComponent } from './room-type-management-list/room-type-management-list.component';
import { RoomTypeManagementComponent } from './room-type-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RoomTypeManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: RoomTypeManagementListComponent,
      },
      {
        path: 'create',
        component: RoomTypeManagementCreateComponent,
      },
      {
        path: 'edit/:id',
        component: RoomTypeManagementEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomTypeManagementRoutingModule { }
