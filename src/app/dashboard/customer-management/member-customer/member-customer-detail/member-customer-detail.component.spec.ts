import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCustomerDetailComponent } from './member-customer-detail.component';

describe('MemberCustomerDetailComponent', () => {
  let component: MemberCustomerDetailComponent;
  let fixture: ComponentFixture<MemberCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCustomerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
