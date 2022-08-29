import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfilePrintComponent } from './member-profile-print.component';

describe('MemberProfilePrintComponent', () => {
  let component: MemberProfilePrintComponent;
  let fixture: ComponentFixture<MemberProfilePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberProfilePrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfilePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
