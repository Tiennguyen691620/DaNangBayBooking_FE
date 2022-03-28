import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationManagementComponent } from './accommodation-management.component';

describe('AccommodationManagementComponent', () => {
  let component: AccommodationManagementComponent;
  let fixture: ComponentFixture<AccommodationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
