import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyVendorBillComponent } from './verify-vendor-bill.component';

describe('VerifyVendorBillComponent', () => {
  let component: VerifyVendorBillComponent;
  let fixture: ComponentFixture<VerifyVendorBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyVendorBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyVendorBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
