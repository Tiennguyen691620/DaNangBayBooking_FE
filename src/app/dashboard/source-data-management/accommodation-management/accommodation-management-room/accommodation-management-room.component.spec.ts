import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationManagementRoomComponent } from './accommodation-management-room.component';

describe('AccommodationManagementRoomComponent', () => {
  let component: AccommodationManagementRoomComponent;
  let fixture: ComponentFixture<AccommodationManagementRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationManagementRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationManagementRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
