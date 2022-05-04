import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationComponent } from './accommodation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccommodationComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: AccommodationListComponent,
      },
      {
        path: 'detail',
        component: AccommodationDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
