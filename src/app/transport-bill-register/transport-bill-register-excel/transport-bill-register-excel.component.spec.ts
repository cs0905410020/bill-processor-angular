import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportBillRegisterExcelComponent } from './transport-bill-register-excel.component';

describe('TransportBillRegisterExcelComponent', () => {
  let component: TransportBillRegisterExcelComponent;
  let fixture: ComponentFixture<TransportBillRegisterExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportBillRegisterExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportBillRegisterExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
