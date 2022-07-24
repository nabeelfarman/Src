import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBranchTableComponent } from './new-branch-table.component';

describe('NewBranchTableComponent', () => {
  let component: NewBranchTableComponent;
  let fixture: ComponentFixture<NewBranchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBranchTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBranchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
