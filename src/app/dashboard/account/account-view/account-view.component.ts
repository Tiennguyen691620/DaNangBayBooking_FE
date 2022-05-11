import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerModel } from './../../../shared/models/customer/customer.model';
import { LocationModel } from './../../../shared/models/master-data/location.model';
import { MasterDataService } from './../../../shared/services/master-data.service';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { CustomerService } from './../../../shared/services/customer.service';


import { Component, Input, OnInit } from '@angular/core';

import { ETypeForm } from 'src/app/shared/emun/type-form.enum';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss'],
})
export class AccountViewComponent implements OnInit {
  id: string;
  eTypeForm = ETypeForm;
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // this.id = this.route.snapshot.params.id.includes('?')
    //   ? this.route.snapshot.params.id.split('?')[0]
    //   : this.route.snapshot.params.id;
  }


  
}
