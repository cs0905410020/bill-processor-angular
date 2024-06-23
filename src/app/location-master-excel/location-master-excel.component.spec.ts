import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMasterExcelComponent } from './location-master-excel.component';

describe('LocationMasterExcelComponent', () => {
  let component: LocationMasterExcelComponent;
  let fixture: ComponentFixture<LocationMasterExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMasterExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMasterExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
