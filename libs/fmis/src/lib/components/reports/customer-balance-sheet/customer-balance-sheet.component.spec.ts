import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBalanceSheetComponent } from './customer-balance-sheet.component';

describe('CustomerBalanceSheetComponent', () => {
  let component: CustomerBalanceSheetComponent;
  let fixture: ComponentFixture<CustomerBalanceSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBalanceSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBalanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
