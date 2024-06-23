import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCfaBillRegisterComponent } from './add-cfa-bill-register.component';

describe('AddCfaBillRegisterComponent', () => {
  let component: AddCfaBillRegisterComponent;
  let fixture: ComponentFixture<AddCfaBillRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCfaBillRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCfaBillRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
