import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManagementListComponent } from './employee-management-list.component';

describe('EmployeeManagementListComponent', () => {
  let component: EmployeeManagementListComponent;
  let fixture: ComponentFixture<EmployeeManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeManagementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
