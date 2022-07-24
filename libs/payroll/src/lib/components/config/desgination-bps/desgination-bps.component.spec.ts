import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesginationBpsComponent } from './desgination-bps.component';

describe('DesginationBpsComponent', () => {
  let component: DesginationBpsComponent;
  let fixture: ComponentFixture<DesginationBpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesginationBpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesginationBpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
