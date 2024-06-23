import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightMasterExcelComponent } from './freight-master-excel.component';

describe('FreightMasterExcelComponent', () => {
  let component: FreightMasterExcelComponent;
  let fixture: ComponentFixture<FreightMasterExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightMasterExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightMasterExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
