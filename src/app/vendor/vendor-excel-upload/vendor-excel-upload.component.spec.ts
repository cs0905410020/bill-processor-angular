import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorExcelUploadComponent } from './vendor-excel-upload.component';

describe('VendorExcelUploadComponent', () => {
  let component: VendorExcelUploadComponent;
  let fixture: ComponentFixture<VendorExcelUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorExcelUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorExcelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
