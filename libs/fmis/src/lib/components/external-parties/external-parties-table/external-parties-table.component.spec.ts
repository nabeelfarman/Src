import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalPartiesTableComponent } from './external-parties-table.component';

describe('ExternalPartiesTableComponent', () => {
  let component: ExternalPartiesTableComponent;
  let fixture: ComponentFixture<ExternalPartiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalPartiesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalPartiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
