import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowDeductionRulesComponent } from './allow-deduction-rules.component';

describe('AllowDeductionRulesComponent', () => {
  let component: AllowDeductionRulesComponent;
  let fixture: ComponentFixture<AllowDeductionRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowDeductionRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowDeductionRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
