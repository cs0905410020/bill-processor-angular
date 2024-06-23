import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripMasterExcelComponent } from './trip-master-excel.component';

describe('TripMasterExcelComponent', () => {
  let component: TripMasterExcelComponent;
  let fixture: ComponentFixture<TripMasterExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripMasterExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripMasterExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
