import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetTableComponent } from './fixed-asset-table.component';

describe('FixedAssetTableComponent', () => {
  let component: FixedAssetTableComponent;
  let fixture: ComponentFixture<FixedAssetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedAssetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
