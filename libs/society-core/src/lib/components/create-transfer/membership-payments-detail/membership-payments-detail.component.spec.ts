import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPaymentsDetailComponent } from './membership-payments-detail.component';

describe('MembershipPaymentsDetailComponent', () => {
  let component: MembershipPaymentsDetailComponent;
  let fixture: ComponentFixture<MembershipPaymentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipPaymentsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPaymentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
