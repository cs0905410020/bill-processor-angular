import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselIndexExcelComponent } from './diesel-index-excel.component';

describe('DieselIndexExcelComponent', () => {
  let component: DieselIndexExcelComponent;
  let fixture: ComponentFixture<DieselIndexExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieselIndexExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieselIndexExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
