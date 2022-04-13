import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationManagementCreateComponent } from './accommodation-management-create.component';

describe('AccommodationManagementCreateComponent', () => {
  let component: AccommodationManagementCreateComponent;
  let fixture: ComponentFixture<AccommodationManagementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationManagementCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
