import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandOwnerInfoComponent } from './land-owner-info.component';

describe('LandOwnerInfoComponent', () => {
  let component: LandOwnerInfoComponent;
  let fixture: ComponentFixture<LandOwnerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandOwnerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
