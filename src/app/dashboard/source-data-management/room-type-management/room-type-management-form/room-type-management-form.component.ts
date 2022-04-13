import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ETypeForm } from './../../../../shared/enum/type-form.enum';
import { Component, Input, OnInit } from '@angular/core';
import { RoomTypeService } from 'src/app/shared/services/room-type.service';
import { RoomTypeModel } from 'src/app/shared/models/room-type/room-type.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import Utils from 'src/app/shared/helpers/utils.helper';

@Component({
  selector: 'app-room-type-management-form',
  templateUrl: './room-type-management-form.component.html',
  styleUrls: ['./room-type-management-form.component.scss'],
})
export class RoomTypeManagementFormComponent implements OnInit {
  @Input() id!: string;
  @Input() type!: string;
  eTypeForm = ETypeForm;
  roomTypeForm!: FormGroup;
  roomTypeModel!: RoomTypeModel;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private roomTypeService: RoomTypeService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    if(this.id){
      this.roomTypeService.getRoomTypeDetail(this.id).subscribe(res => {
        this.roomTypeModel = res;
        this.roomTypeForm.patchValue(res);
      })
    }
  }

  createForm(): void {
    this.roomTypeForm = this.fb.group({
      no: { value: null, disabled: true },
      name: [null, Validators.required],
      description: null,
      status: Boolean,
    });
  }

  submitForm(): void {
    if (this.roomTypeForm.valid) {
      this.roomTypeService
        .createRoomType(this.mapDate(this.roomTypeForm.getRawValue()))
        .subscribe((_) => {
          this.notification.success(this.id ? 'Cập nhật thông tin thành công!': 'Tạo mới thông tin thành công','',Utils.setStyleNotification());
          this.router.navigate([
            '/dashboard/source-data-management/room-type/list',1
          ]);
        });
        //console.log(this.roomTypeForm.getRawValue()); 
    }
  }

  mapDate(formValue: any): any {
    if (!formValue) {
      return null;
    }
    return {
      roomTypeID: this.id,
      no: formValue.no,
      name: formValue.name,
      description: formValue.description,
      status: formValue.status,
    };
  }
}
