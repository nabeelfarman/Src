import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyAreaBlockComponent } from './society-area-block.component';

describe('SocietyAreaBlockComponent', () => {
  let component: SocietyAreaBlockComponent;
  let fixture: ComponentFixture<SocietyAreaBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyAreaBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyAreaBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
