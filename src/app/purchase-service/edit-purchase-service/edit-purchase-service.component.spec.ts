import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseServiceComponent } from './edit-purchase-service.component';

describe('EditPurchaseServiceComponent', () => {
  let component: EditPurchaseServiceComponent;
  let fixture: ComponentFixture<EditPurchaseServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPurchaseServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPurchaseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
