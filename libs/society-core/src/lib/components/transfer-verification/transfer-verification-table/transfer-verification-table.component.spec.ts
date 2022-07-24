import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferVerificationTableComponent } from './transfer-verification-table.component';

describe('TransferVerificationTableComponent', () => {
  let component: TransferVerificationTableComponent;
  let fixture: ComponentFixture<TransferVerificationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferVerificationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferVerificationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
