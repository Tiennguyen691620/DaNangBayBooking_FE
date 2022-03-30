import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryLoginComponent } from './diary-login.component';

describe('DiaryLoginComponent', () => {
  let component: DiaryLoginComponent;
  let fixture: ComponentFixture<DiaryLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
