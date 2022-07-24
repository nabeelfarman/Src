import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipGroupComponent } from './membership-group.component';

describe('MembershipGroupComponent', () => {
  let component: MembershipGroupComponent;
  let fixture: ComponentFixture<MembershipGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
