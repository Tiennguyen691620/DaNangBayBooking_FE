import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';

@Component({
  selector: 'app-member-customer-detail',
  templateUrl: './member-customer-detail.component.html',
  styleUrls: ['./member-customer-detail.component.scss'],
})
export class MemberCustomerDetailComponent implements OnInit {
  
  id: string;
  eTypeForm = ETypeForm;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id.includes('?')
      ? this.route.snapshot.params.id.split('?')[0]
      : this.route.snapshot.params.id;
  }
}
