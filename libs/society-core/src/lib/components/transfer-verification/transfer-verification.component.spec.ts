import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferVerificationComponent } from './transfer-verification.component';

describe('TransferVerificationComponent', () => {
  let component: TransferVerificationComponent;
  let fixture: ComponentFixture<TransferVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
