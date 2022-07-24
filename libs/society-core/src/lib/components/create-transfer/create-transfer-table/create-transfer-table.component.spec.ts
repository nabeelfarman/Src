import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransferTableComponent } from './create-transfer-table.component';

describe('CreateTransferTableComponent', () => {
  let component: CreateTransferTableComponent;
  let fixture: ComponentFixture<CreateTransferTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTransferTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransferTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
