import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityManagementComponent } from './utility-management.component';

describe('UtilityManagementComponent', () => {
  let component: UtilityManagementComponent;
  let fixture: ComponentFixture<UtilityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilityManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
