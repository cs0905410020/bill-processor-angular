import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseMaterialDetailsComponent } from './view-purchase-material-details.component';

describe('ViewPurchaseMaterialDetailsComponent', () => {
  let component: ViewPurchaseMaterialDetailsComponent;
  let fixture: ComponentFixture<ViewPurchaseMaterialDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPurchaseMaterialDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPurchaseMaterialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
