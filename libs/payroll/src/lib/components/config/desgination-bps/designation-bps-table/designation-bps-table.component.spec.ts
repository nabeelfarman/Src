import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationBpsTableComponent } from './designation-bps-table.component';

describe('DesignationBpsTableComponent', () => {
  let component: DesignationBpsTableComponent;
  let fixture: ComponentFixture<DesignationBpsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationBpsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationBpsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
