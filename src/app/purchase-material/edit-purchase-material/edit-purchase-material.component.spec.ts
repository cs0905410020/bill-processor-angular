import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseMaterialComponent } from './edit-purchase-material.component';

describe('EditPurchaseMaterialComponent', () => {
  let component: EditPurchaseMaterialComponent;
  let fixture: ComponentFixture<EditPurchaseMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPurchaseMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPurchaseMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
