import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipFilePrintComponent } from './ownership-file-print.component';

describe('OwnershipFilePrintComponent', () => {
  let component: OwnershipFilePrintComponent;
  let fixture: ComponentFixture<OwnershipFilePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnershipFilePrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipFilePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
