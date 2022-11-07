import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOwnershipComponent } from './file-ownership.component';

describe('FileOwnershipComponent', () => {
  let component: FileOwnershipComponent;
  let fixture: ComponentFixture<FileOwnershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileOwnershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
