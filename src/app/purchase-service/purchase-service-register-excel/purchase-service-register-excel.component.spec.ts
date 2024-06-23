import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseServiceRegisterExcelComponent } from './purchase-service-register-excel.component';

describe('PurchaseServiceRegisterExcelComponent', () => {
  let component: PurchaseServiceRegisterExcelComponent;
  let fixture: ComponentFixture<PurchaseServiceRegisterExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseServiceRegisterExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseServiceRegisterExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
