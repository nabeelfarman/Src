import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialBalanceTableComponent } from './trial-balance-table.component';

describe('TrialBalanceTableComponent', () => {
  let component: TrialBalanceTableComponent;
  let fixture: ComponentFixture<TrialBalanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialBalanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialBalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
