import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationManagementFormComponent } from './accommodation-management-form.component';

describe('AccommodationManagementFormComponent', () => {
  let component: AccommodationManagementFormComponent;
  let fixture: ComponentFixture<AccommodationManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationManagementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
