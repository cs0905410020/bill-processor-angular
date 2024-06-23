import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransportBillRegisterDetailsComponent } from './view-transport-bill-register-details.component';

describe('ViewTransportBillRegisterDetailsComponent', () => {
  let component: ViewTransportBillRegisterDetailsComponent;
  let fixture: ComponentFixture<ViewTransportBillRegisterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTransportBillRegisterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransportBillRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
