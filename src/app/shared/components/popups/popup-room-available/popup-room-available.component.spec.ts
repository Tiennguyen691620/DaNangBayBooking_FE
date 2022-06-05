import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRoomAvailableComponent } from './popup-room-available.component';

describe('PopupRoomAvailableComponent', () => {
  let component: PopupRoomAvailableComponent;
  let fixture: ComponentFixture<PopupRoomAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupRoomAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRoomAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
