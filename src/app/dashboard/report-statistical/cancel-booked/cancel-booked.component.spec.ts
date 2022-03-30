import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBookedComponent } from './cancel-booked.component';

describe('CancelBookedComponent', () => {
  let component: CancelBookedComponent;
  let fixture: ComponentFixture<CancelBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelBookedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
