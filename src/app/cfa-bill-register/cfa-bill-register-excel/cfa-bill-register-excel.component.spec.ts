import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfaBillRegisterExcelComponent } from './cfa-bill-register-excel.component';

describe('CfaBillRegisterExcelComponent', () => {
  let component: CfaBillRegisterExcelComponent;
  let fixture: ComponentFixture<CfaBillRegisterExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfaBillRegisterExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfaBillRegisterExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
