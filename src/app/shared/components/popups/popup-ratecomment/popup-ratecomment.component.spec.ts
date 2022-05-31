import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRatecommentComponent } from './popup-ratecomment.component';

describe('PopupRatecommentComponent', () => {
  let component: PopupRatecommentComponent;
  let fixture: ComponentFixture<PopupRatecommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupRatecommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRatecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
