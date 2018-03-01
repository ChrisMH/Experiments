import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildControlComponent } from './child-control.component';

describe('ChildControlComponent', () => {
  let component: ChildControlComponent;
  let fixture: ComponentFixture<ChildControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
