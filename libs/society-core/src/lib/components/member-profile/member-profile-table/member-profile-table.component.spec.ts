import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfileTableComponent } from './member-profile-table.component';

describe('MemberProfileTableComponent', () => {
  let component: MemberProfileTableComponent;
  let fixture: ComponentFixture<MemberProfileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberProfileTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
