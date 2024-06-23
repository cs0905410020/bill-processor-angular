import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseServiceDetailsComponent } from './view-purchase-service-details.component';

describe('ViewPurchaseServiceDetailsComponent', () => {
  let component: ViewPurchaseServiceDetailsComponent;
  let fixture: ComponentFixture<ViewPurchaseServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPurchaseServiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPurchaseServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
