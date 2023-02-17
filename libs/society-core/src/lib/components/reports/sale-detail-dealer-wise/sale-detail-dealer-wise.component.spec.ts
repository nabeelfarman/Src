import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDetailDealerWiseComponent } from './sale-detail-dealer-wise.component';

describe('SaleDetailDealerWiseComponent', () => {
  let component: SaleDetailDealerWiseComponent;
  let fixture: ComponentFixture<SaleDetailDealerWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleDetailDealerWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDetailDealerWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
