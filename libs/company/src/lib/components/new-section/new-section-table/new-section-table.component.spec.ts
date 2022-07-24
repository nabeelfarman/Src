import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSectionTableComponent } from './new-section-table.component';

describe('NewSectionTableComponent', () => {
  let component: NewSectionTableComponent;
  let fixture: ComponentFixture<NewSectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSectionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
