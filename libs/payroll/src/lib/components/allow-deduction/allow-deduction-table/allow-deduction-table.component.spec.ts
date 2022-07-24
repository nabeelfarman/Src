import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowDeductionTableComponent } from './allow-deduction-table.component';

describe('AllowDeductionTableComponent', () => {
  let component: AllowDeductionTableComponent;
  let fixture: ComponentFixture<AllowDeductionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowDeductionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowDeductionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
