import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCfaBillRegisterDetailsComponent } from './view-cfa-bill-register-details.component';

describe('ViewCfaBillRegisterDetailsComponent', () => {
  let component: ViewCfaBillRegisterDetailsComponent;
  let fixture: ComponentFixture<ViewCfaBillRegisterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCfaBillRegisterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCfaBillRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
