import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component, Input } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        StubAppHeaderComponent,
        AppComponent
      ],
    }).compileComponents();
  }));


  beforeEach( () => {

  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "HAWCAMFrontend"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('HAWCAMFrontend');
  });


});


@Component({
  selector: 'app-header',
  template: ''
})
class StubAppHeaderComponent {
  @Input('objHeaderData') objHeaderData : any;
}
