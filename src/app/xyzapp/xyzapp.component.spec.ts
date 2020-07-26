import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XyzappComponent } from './xyzapp.component';

describe('XyzappComponent', () => {
  let component: XyzappComponent;
  let fixture: ComponentFixture<XyzappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XyzappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XyzappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
