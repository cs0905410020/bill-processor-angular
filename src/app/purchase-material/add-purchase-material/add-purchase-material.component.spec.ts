import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseMaterialComponent } from './add-purchase-material.component';

describe('AddPurchaseMaterialComponent', () => {
  let component: AddPurchaseMaterialComponent;
  let fixture: ComponentFixture<AddPurchaseMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
