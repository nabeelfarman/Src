import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSectionComponent } from './tax-section.component';

describe('TaxSectionComponent', () => {
  let component: TaxSectionComponent;
  let fixture: ComponentFixture<TaxSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
