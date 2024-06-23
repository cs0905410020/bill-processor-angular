import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseServiceComponent } from './view-purchase-service.component';

describe('ViewPurchaseServiceComponent', () => {
  let component: ViewPurchaseServiceComponent;
  let fixture: ComponentFixture<ViewPurchaseServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPurchaseServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPurchaseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
