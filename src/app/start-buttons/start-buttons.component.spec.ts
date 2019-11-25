import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartButtonsComponent } from './start-buttons.component';

describe('StartButtonsComponent', () => {
  let component: StartButtonsComponent;
  let fixture: ComponentFixture<StartButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
