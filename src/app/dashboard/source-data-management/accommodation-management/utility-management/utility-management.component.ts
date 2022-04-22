import { AccommodationService } from './../../../../shared/services/accommodation.service';

import { Component, Input, OnInit } from '@angular/core';
import {
  IconUtility,
  IconUtilityList,
} from 'src/app/shared/constants/icon-utility';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import Utils from 'src/app/shared/helpers/utils.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { defaults } from 'lodash';

@Component({
  selector: 'app-utility-management',
  templateUrl: './utility-management.component.html',
  styleUrls: ['./utility-management.component.scss'],
})
export class UtilityManagementComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;
  typeForm: string;
  eTypeForm = ETypeForm;
  iconUtilityList: IconUtility[] = [];
  utilityApiList: {
    utilityID: string;
    utilityType: string;
    isPrivate: boolean;
  }[] = [];
  utilityApiListBackup: {
    utilityID: string;
    utilityType: string;
    isPrivate: boolean;
  }[] = [];

  constructor(
    private accommodationService: AccommodationService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIcon();
    this.typeForm = this.type;
    this.accommodationService
      .getUtilityAccommodation(this.id)
      .subscribe((res) => {
        this.utilityApiList = [...res];
        this.utilityApiListBackup = [...res];
        this.iconUtilityList.forEach((item) => {
          const icon = res.find((x) => x.utilityType === item.value);
          if (icon) {
            item.checked = true;
            item.isPrivate = icon.isPrivate ?? false;
          } else {
            item.checked = false;
          }
        });
      });
  }

  submit(): void {
    const queryParams = (this.iconUtilityList ?? [])
      .filter((o) => o.checked)
      ?.map((item, index) => {
        const param = {
          utilityID: (this.utilityApiList ?? [])[index]
            ? (this.utilityApiList ?? [])[index].utilityID
            : null,
          utilityType: item.value,
          isPrivate: item.isPrivate,
        };
        if (!param.utilityID) {
          delete param.utilityID;
        }
        return param;
      });
    this.accommodationService
      .updateAccommodationUtility(queryParams, this.id)
      .subscribe((_) => {
        this.notification.success(
          'Cập nhật dữ liệu thành công',
          '',
          Utils.setStyleNotification()
        );
        this.typeForm = this.eTypeForm.view;
        this.utilityApiListBackup = queryParams;
      });
  }

  cancel(): void {
    this.typeForm = this.eTypeForm.view;
    this.iconUtilityList.forEach((item) => {
      if (this.utilityApiListBackup.some((o) => o.utilityType === item.value)) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
  }

  isDisableForm(isSelected: boolean): boolean {
    return !isSelected && this.typeForm === this.eTypeForm.view;
  }

  getIcon(): void {
    this.iconUtilityList = IconUtilityList;
  }

  changeActive(isChecked: boolean, utility: IconUtility): void {
    if (isChecked && !utility.isPrivate) {
      utility.checked = true;
      utility.isPrivate = false; 
      return;
    }
    // if (isChecked && utility.isPrivate) {
    //   utility.checked = true;
    //   utility.isPrivate = true;
    //   return;
    // }
    if (isChecked) {
      return;
    }
  }
}
