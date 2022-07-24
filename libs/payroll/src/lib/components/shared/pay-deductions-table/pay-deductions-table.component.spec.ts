import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDeductionsTableComponent } from './pay-deductions-table.component';

describe('PayDeductionsTableComponent', () => {
  let component: PayDeductionsTableComponent;
  let fixture: ComponentFixture<PayDeductionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayDeductionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayDeductionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
