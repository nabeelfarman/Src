import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPlotFilePaymentTableComponent } from './saved-plot-file-payment-table.component';

describe('SavedPlotFilePaymentTableComponent', () => {
  let component: SavedPlotFilePaymentTableComponent;
  let fixture: ComponentFixture<SavedPlotFilePaymentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPlotFilePaymentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPlotFilePaymentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
