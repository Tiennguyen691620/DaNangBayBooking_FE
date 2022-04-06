import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeManagementFormComponent } from './room-type-management-form.component';

describe('RoomTypeManagementFormComponent', () => {
  let component: RoomTypeManagementFormComponent;
  let fixture: ComponentFixture<RoomTypeManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTypeManagementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTypeManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
