import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoSearchableComponent } from './employee-info-searchable.component';

describe('EmployeeInfoSearchableComponent', () => {
  let component: EmployeeInfoSearchableComponent;
  let fixture: ComponentFixture<EmployeeInfoSearchableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeInfoSearchableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInfoSearchableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
