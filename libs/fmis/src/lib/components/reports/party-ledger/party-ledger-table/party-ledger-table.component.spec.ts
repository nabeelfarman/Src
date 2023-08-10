import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyLedgerTableComponent } from './party-ledger-table.component';

describe('PartyLedgerTableComponent', () => {
  let component: PartyLedgerTableComponent;
  let fixture: ComponentFixture<PartyLedgerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyLedgerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyLedgerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
