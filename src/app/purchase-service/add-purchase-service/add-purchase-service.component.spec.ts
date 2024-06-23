import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseServiceComponent } from './add-purchase-service.component';

describe('AddPurchaseServiceComponent', () => {
  let component: AddPurchaseServiceComponent;
  let fixture: ComponentFixture<AddPurchaseServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
