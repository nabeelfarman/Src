import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalPartiesComponent } from './external-parties.component';

describe('ExternalPartiesComponent', () => {
  let component: ExternalPartiesComponent;
  let fixture: ComponentFixture<ExternalPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalPartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
