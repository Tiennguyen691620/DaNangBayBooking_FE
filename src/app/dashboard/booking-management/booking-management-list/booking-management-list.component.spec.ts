import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingManagementListComponent } from './booking-management-list.component';

describe('BookingManagementListComponent', () => {
  let component: BookingManagementListComponent;
  let fixture: ComponentFixture<BookingManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingManagementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
