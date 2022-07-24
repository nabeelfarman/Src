import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentTableComponent } from './sent-table.component';

describe('SentTableComponent', () => {
  let component: SentTableComponent;
  let fixture: ComponentFixture<SentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
