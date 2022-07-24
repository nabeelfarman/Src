import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowDeductionComponent } from './allow-deduction.component';

describe('AllowDeductionComponent', () => {
  let component: AllowDeductionComponent;
  let fixture: ComponentFixture<AllowDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowDeductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
