import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSupportListComponent } from './request-support-list.component';

describe('RequestSupportListComponent', () => {
  let component: RequestSupportListComponent;
  let fixture: ComponentFixture<RequestSupportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSupportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSupportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
