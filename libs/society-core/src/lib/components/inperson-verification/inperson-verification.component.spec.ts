import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpersonVerificationComponent } from './inperson-verification.component';

describe('InpersonVerificationComponent', () => {
  let component: InpersonVerificationComponent;
  let fixture: ComponentFixture<InpersonVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpersonVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpersonVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
