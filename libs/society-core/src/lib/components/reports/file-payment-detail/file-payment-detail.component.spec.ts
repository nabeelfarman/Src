import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePaymentDetailComponent } from './file-payment-detail.component';

describe('FilePaymentDetailComponent', () => {
  let component: FilePaymentDetailComponent;
  let fixture: ComponentFixture<FilePaymentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilePaymentDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
