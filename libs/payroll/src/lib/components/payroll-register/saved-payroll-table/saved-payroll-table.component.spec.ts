import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPayrollTableComponent } from './saved-payroll-table.component';

describe('SavedPayrollTableComponent', () => {
  let component: SavedPayrollTableComponent;
  let fixture: ComponentFixture<SavedPayrollTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPayrollTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPayrollTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
