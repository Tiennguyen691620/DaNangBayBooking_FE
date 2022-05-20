import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { IconUtility, IconUtilityList } from 'src/app/shared/constants/icon-utility';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';

@Component({
  selector: 'app-popup-utility-provided',
  templateUrl: './popup-utility-provided.component.html',
  styleUrls: ['./popup-utility-provided.component.scss'],
})
export class PopupUtilityProvidedComponent implements OnInit {
  @Input() id: string;
  iconUtilityList: IconUtility[] = [];
  iconUtilityListChecked: IconUtility[] = [];
  iconUtilityListDisabled: IconUtility[] = [];
  utilityApiList: {
    id: string;
    utilityType: string;
    isPrivate: boolean;
  }[] = [];
  utilityApiBackupList: {
    id: string;
    utilityType: string;
    isPrivate: boolean;
  }[] = [];
  constructor(
    private accommodationService: AccommodationService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.getIcon();
    this.accommodationService
      .getUtilityAccommodation(this.id)
      .subscribe((res) => {
        this.utilityApiList = [...res];
        this.utilityApiBackupList = [...res];
        this.iconUtilityList.forEach((item) => {
          const icon = res.find((o) => o.utilityType === item.value);
          if (icon) {
            item.checked = true;
            item.isPrivate = icon.isPrivate ?? false;
          } else {
            item.checked = false;
          }
        });
        this.iconUtilityListChecked = this.iconUtilityList.filter(
          (item) => item.checked
        );
        this.iconUtilityListDisabled = this.iconUtilityList.filter(
          (item) => !item.checked
        );
      });
  }
  isDisableForm(isSelected: boolean): boolean {
    return !isSelected ;
  }

  cancel(): void {
    this.modal.destroy();
  }

  getIcon(): void {
    this.iconUtilityList = IconUtilityList;
  }
}
