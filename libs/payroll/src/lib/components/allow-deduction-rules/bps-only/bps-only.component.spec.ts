import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpsOnlyComponent } from './bps-only.component';

describe('BpsOnlyComponent', () => {
  let component: BpsOnlyComponent;
  let fixture: ComponentFixture<BpsOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpsOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BpsOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
