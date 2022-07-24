import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTaxInfoComponent } from './transaction-tax-info.component';

describe('TransactionTaxInfoComponent', () => {
  let component: TransactionTaxInfoComponent;
  let fixture: ComponentFixture<TransactionTaxInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTaxInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTaxInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
