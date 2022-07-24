import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpersonVerificationTableComponent } from './inperson-verification-table.component';

describe('InpersonVerificationTableComponent', () => {
  let component: InpersonVerificationTableComponent;
  let fixture: ComponentFixture<InpersonVerificationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpersonVerificationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpersonVerificationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
