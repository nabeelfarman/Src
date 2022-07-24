import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferLetterComponent } from './transfer-letter.component';

describe('TransferLetterComponent', () => {
  let component: TransferLetterComponent;
  let fixture: ComponentFixture<TransferLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
