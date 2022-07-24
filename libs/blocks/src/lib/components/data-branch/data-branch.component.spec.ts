import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBranchComponent } from './data-branch.component';

describe('DataBranchComponent', () => {
  let component: DataBranchComponent;
  let fixture: ComponentFixture<DataBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
