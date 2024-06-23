import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseServiceWorkIdNumberComponent } from './purchase-service-work-id-number.component';

describe('PurchaseServiceWorkIdNumberComponent', () => {
  let component: PurchaseServiceWorkIdNumberComponent;
  let fixture: ComponentFixture<PurchaseServiceWorkIdNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseServiceWorkIdNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseServiceWorkIdNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
