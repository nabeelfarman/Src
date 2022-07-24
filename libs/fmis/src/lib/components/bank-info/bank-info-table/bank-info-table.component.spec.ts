import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankInfoTableComponent } from './bank-info-table.component';

describe('BankInfoTableComponent', () => {
  let component: BankInfoTableComponent;
  let fixture: ComponentFixture<BankInfoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankInfoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
