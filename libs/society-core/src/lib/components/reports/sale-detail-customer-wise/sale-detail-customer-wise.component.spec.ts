import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDetailCustomerWiseComponent } from './sale-detail-customer-wise.component';

describe('SaleDetailCustomerWiseComponent', () => {
  let component: SaleDetailCustomerWiseComponent;
  let fixture: ComponentFixture<SaleDetailCustomerWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleDetailCustomerWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDetailCustomerWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
