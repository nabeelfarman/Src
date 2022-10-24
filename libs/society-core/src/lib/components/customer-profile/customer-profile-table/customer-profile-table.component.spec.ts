import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfileTableComponent } from './customer-profile-table.component';

describe('CustomerProfileTableComponent', () => {
  let component: CustomerProfileTableComponent;
  let fixture: ComponentFixture<CustomerProfileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProfileTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
