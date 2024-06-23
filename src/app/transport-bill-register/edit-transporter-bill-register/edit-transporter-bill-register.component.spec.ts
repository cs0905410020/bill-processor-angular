import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransporterBillRegisterComponent } from './edit-transporter-bill-register.component';

describe('EditTransporterBillRegisterComponent', () => {
  let component: EditTransporterBillRegisterComponent;
  let fixture: ComponentFixture<EditTransporterBillRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransporterBillRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransporterBillRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
