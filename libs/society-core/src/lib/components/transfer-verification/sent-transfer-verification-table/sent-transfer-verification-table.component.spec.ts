import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentTransferVerificationTableComponent } from './sent-transfer-verification-table.component';

describe('SentTransferVerificationTableComponent', () => {
  let component: SentTransferVerificationTableComponent;
  let fixture: ComponentFixture<SentTransferVerificationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentTransferVerificationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentTransferVerificationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
