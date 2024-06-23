import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransportBillRegisterComponent } from './add-transport-bill-register.component';

describe('AddTransportBillRegisterComponent', () => {
  let component: AddTransportBillRegisterComponent;
  let fixture: ComponentFixture<AddTransportBillRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransportBillRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransportBillRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
