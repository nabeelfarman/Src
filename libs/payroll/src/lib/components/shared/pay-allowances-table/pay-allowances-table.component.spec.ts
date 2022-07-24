import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayAllowancesTableComponent } from './pay-allowances-table.component';

describe('PayAllowancesTableComponent', () => {
  let component: PayAllowancesTableComponent;
  let fixture: ComponentFixture<PayAllowancesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayAllowancesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAllowancesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
