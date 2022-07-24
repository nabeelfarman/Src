import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTransferTableComponent } from './file-transfer-table.component';

describe('FileTransferTableComponent', () => {
  let component: FileTransferTableComponent;
  let fixture: ComponentFixture<FileTransferTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTransferTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTransferTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
