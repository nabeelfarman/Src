import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSingInUpComponent } from './member-sing-in-up.component';

describe('MemberSingInUpComponent', () => {
  let component: MemberSingInUpComponent;
  let fixture: ComponentFixture<MemberSingInUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSingInUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSingInUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
