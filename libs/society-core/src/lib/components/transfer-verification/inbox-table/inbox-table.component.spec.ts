import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxTableComponent } from './inbox-table.component';

describe('InboxTableComponent', () => {
  let component: InboxTableComponent;
  let fixture: ComponentFixture<InboxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
