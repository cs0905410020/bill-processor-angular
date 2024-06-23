import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBillCopyExcelComponent } from './vendor-bill-copy-excel.component';

describe('VendorBillCopyExcelComponent', () => {
  let component: VendorBillCopyExcelComponent;
  let fixture: ComponentFixture<VendorBillCopyExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBillCopyExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBillCopyExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
