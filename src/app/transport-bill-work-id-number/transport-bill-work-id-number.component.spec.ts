import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportBillWorkIdNumberComponent } from './transport-bill-work-id-number.component';

describe('TransportBillWorkIdNumberComponent', () => {
  let component: TransportBillWorkIdNumberComponent;
  let fixture: ComponentFixture<TransportBillWorkIdNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportBillWorkIdNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportBillWorkIdNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
