import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBbokRptComponent } from './cash-bbok-rpt.component';

describe('CashBbokRptComponent', () => {
  let component: CashBbokRptComponent;
  let fixture: ComponentFixture<CashBbokRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashBbokRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBbokRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
