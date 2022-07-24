import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFixationComponent } from './pay-fixation.component';

describe('PayFixationComponent', () => {
  let component: PayFixationComponent;
  let fixture: ComponentFixture<PayFixationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayFixationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFixationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
