import { ActivatedRoute } from '@angular/router';
import { ETypeForm } from './../../../../shared/enum/type-form.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-type-management-edit',
  templateUrl: './room-type-management-edit.component.html',
  styleUrls: ['./room-type-management-edit.component.scss']
})
export class RoomTypeManagementEditComponent implements OnInit {

  eTypeForm = ETypeForm;
  id!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'].includes('?') ? this.route.snapshot.params['id'].split('?')[0] : this.route.snapshot.params['id'];
  }

}
