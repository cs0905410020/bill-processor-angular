import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfaContractExcelComponent } from './cfa-contract-excel.component';

describe('CfaContractExcelComponent', () => {
  let component: CfaContractExcelComponent;
  let fixture: ComponentFixture<CfaContractExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfaContractExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfaContractExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
