import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseMaterialComponent } from './view-purchase-material.component';

describe('ViewPurchaseMaterialComponent', () => {
  let component: ViewPurchaseMaterialComponent;
  let fixture: ComponentFixture<ViewPurchaseMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPurchaseMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPurchaseMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
