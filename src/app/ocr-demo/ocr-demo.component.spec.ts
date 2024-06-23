import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrDemoComponent } from './ocr-demo.component';

describe('OcrDemoComponent', () => {
  let component: OcrDemoComponent;
  let fixture: ComponentFixture<OcrDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
