import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBalanceSummaryComponent } from './bank-balance-summary.component';

describe('BankBalanceSummaryComponent', () => {
  let component: BankBalanceSummaryComponent;
  let fixture: ComponentFixture<BankBalanceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankBalanceSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankBalanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
