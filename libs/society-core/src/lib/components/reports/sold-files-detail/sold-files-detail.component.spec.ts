import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldFilesDetailComponent } from './sold-files-detail.component';

describe('SoldFilesDetailComponent', () => {
  let component: SoldFilesDetailComponent;
  let fixture: ComponentFixture<SoldFilesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldFilesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldFilesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
