import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGroupTableComponent } from './main-group-table.component';

describe('MainGroupTableComponent', () => {
  let component: MainGroupTableComponent;
  let fixture: ComponentFixture<MainGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGroupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
