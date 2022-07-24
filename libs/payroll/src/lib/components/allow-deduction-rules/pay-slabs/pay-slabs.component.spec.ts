import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySlabsComponent } from './pay-slabs.component';

describe('PaySlabsComponent', () => {
  let component: PaySlabsComponent;
  let fixture: ComponentFixture<PaySlabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaySlabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaySlabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
