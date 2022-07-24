import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyAreaBlockTableComponent } from './society-area-block-table.component';

describe('SocietyAreaBlockTableComponent', () => {
  let component: SocietyAreaBlockTableComponent;
  let fixture: ComponentFixture<SocietyAreaBlockTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyAreaBlockTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyAreaBlockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
