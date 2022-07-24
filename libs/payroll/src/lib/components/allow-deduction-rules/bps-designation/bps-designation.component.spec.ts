import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpsDesignationComponent } from './bps-designation.component';

describe('BpsDesignationComponent', () => {
  let component: BpsDesignationComponent;
  let fixture: ComponentFixture<BpsDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpsDesignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BpsDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
