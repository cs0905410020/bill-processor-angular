import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCfaBillRegisterComponent } from './view-cfa-bill-register.component';

describe('ViewCfaBillRegisterComponent', () => {
  let component: ViewCfaBillRegisterComponent;
  let fixture: ComponentFixture<ViewCfaBillRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCfaBillRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCfaBillRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
