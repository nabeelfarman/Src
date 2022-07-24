import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSectionTableComponent } from './tax-section-table.component';

describe('TaxSectionTableComponent', () => {
  let component: TaxSectionTableComponent;
  let fixture: ComponentFixture<TaxSectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxSectionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
