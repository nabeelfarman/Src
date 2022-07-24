import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugetHeadComponent } from './buget-head.component';

describe('BugetHeadComponent', () => {
  let component: BugetHeadComponent;
  let fixture: ComponentFixture<BugetHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugetHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugetHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
