import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedVoucherTableComponent } from './saved-voucher-table.component';

describe('SavedVoucherTableComponent', () => {
  let component: SavedVoucherTableComponent;
  let fixture: ComponentFixture<SavedVoucherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedVoucherTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedVoucherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
