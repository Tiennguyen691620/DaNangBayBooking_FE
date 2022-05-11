import { ActivatedRoute } from '@angular/router';
import { ETypeForm } from './../../../shared/emun/type-form.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  id: string;
  eTypeForm = ETypeForm;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params.id.includes('?')
    //   ? this.route.snapshot.params.id.split('?')[0]
    //   : this.route.snapshot.params.id;
  }

}
