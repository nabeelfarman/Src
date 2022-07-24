import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRegisterEmployeeListComponent } from './pay-register-employee-list.component';

describe('PayRegisterEmployeeListComponent', () => {
  let component: PayRegisterEmployeeListComponent;
  let fixture: ComponentFixture<PayRegisterEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRegisterEmployeeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayRegisterEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
