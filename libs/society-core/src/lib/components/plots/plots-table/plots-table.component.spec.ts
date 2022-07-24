import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsTableComponent } from './plots-table.component';

describe('PlotsTableComponent', () => {
  let component: PlotsTableComponent;
  let fixture: ComponentFixture<PlotsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
