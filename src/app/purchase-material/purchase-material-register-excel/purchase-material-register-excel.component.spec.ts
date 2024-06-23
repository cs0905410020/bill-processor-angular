import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMaterialRegisterExcelComponent } from './purchase-material-register-excel.component';

describe('PurchaseMaterialRegisterExcelComponent', () => {
  let component: PurchaseMaterialRegisterExcelComponent;
  let fixture: ComponentFixture<PurchaseMaterialRegisterExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseMaterialRegisterExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseMaterialRegisterExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
