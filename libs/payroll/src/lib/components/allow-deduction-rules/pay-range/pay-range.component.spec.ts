import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRangeComponent } from './pay-range.component';

describe('PayRangeComponent', () => {
  let component: PayRangeComponent;
  let fixture: ComponentFixture<PayRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
