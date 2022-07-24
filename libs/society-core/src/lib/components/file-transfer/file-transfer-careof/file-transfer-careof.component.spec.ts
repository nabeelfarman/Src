import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTransferCareofComponent } from './file-transfer-careof.component';

describe('FileTransferCareofComponent', () => {
  let component: FileTransferCareofComponent;
  let fixture: ComponentFixture<FileTransferCareofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTransferCareofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTransferCareofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
