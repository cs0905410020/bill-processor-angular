import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransportBillRegisterComponent } from './view-transport-bill-register.component';

describe('ViewTransportBillRegisterComponent', () => {
  let component: ViewTransportBillRegisterComponent;
  let fixture: ComponentFixture<ViewTransportBillRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTransportBillRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransportBillRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
