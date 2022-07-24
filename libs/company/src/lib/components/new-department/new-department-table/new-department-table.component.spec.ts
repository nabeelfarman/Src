import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepartmentTableComponent } from './new-department-table.component';

describe('NewDepartmentTableComponent', () => {
  let component: NewDepartmentTableComponent;
  let fixture: ComponentFixture<NewDepartmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDepartmentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDepartmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
