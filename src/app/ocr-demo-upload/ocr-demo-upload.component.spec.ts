import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrDemoUploadComponent } from './ocr-demo-upload.component';

describe('OcrDemoUploadComponent', () => {
  let component: OcrDemoUploadComponent;
  let fixture: ComponentFixture<OcrDemoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrDemoUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrDemoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
