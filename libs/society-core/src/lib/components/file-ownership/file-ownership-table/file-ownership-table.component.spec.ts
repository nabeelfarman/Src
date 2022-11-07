import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOwnershipTableComponent } from './file-ownership-table.component';

describe('FileOwnershipTableComponent', () => {
  let component: FileOwnershipTableComponent;
  let fixture: ComponentFixture<FileOwnershipTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileOwnershipTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileOwnershipTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
