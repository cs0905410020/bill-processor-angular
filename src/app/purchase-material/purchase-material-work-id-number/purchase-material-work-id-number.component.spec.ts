import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMaterialWorkIdNumberComponent } from './purchase-material-work-id-number.component';

describe('PurchaseMaterialWorkIdNumberComponent', () => {
  let component: PurchaseMaterialWorkIdNumberComponent;
  let fixture: ComponentFixture<PurchaseMaterialWorkIdNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseMaterialWorkIdNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseMaterialWorkIdNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
