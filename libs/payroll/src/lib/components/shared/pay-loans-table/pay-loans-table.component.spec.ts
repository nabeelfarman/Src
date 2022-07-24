import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayLoansTableComponent } from './pay-loans-table.component';

describe('PayLoansTableComponent', () => {
  let component: PayLoansTableComponent;
  let fixture: ComponentFixture<PayLoansTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayLoansTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayLoansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
