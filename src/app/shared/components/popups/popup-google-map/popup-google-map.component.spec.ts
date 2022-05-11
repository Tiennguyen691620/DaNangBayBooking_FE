import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGoogleMapComponent } from './popup-google-map.component';

describe('PopupGoogleMapComponent', () => {
  let component: PopupGoogleMapComponent;
  let fixture: ComponentFixture<PopupGoogleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupGoogleMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
