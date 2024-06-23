import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCfaBillRegisterComponent } from './edit-cfa-bill-register.component';

describe('EditCfaBillRegisterComponent', () => {
  let component: EditCfaBillRegisterComponent;
  let fixture: ComponentFixture<EditCfaBillRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCfaBillRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCfaBillRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
