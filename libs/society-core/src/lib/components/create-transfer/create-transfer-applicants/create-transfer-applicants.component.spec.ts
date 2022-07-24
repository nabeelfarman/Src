import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransferApplicantsComponent } from './create-transfer-applicants.component';

describe('CreateTransferApplicantsComponent', () => {
  let component: CreateTransferApplicantsComponent;
  let fixture: ComponentFixture<CreateTransferApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTransferApplicantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransferApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
