import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupTableComponent } from './sub-group-table.component';

describe('SubGroupTableComponent', () => {
  let component: SubGroupTableComponent;
  let fixture: ComponentFixture<SubGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGroupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
