import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptSupervisionComponent } from './receipt-supervision.component';

describe('ReceiptSupervisionComponent', () => {
  let component: ReceiptSupervisionComponent;
  let fixture: ComponentFixture<ReceiptSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptSupervisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
