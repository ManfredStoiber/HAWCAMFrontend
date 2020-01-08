import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HeaderData } from '../headerData.model';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';


describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let headerFixture: ComponentFixture<HeaderComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  const locationStub = {
    back: jasmine.createSpy('back')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TestHostComponent
      ],
      imports: [RouterTestingModule],
      providers: [
        {provide: Location, useValue: locationStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    headerFixture = TestBed.createComponent(HeaderComponent);
    headerComponent = headerFixture.componentInstance;
    headerFixture.detectChanges();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();

    const location = headerFixture.debugElement.injector.get(Location);
  });


  it('should create', () => {
    expect(headerComponent).toBeTruthy();
  });


  it('should have a title with "Inventarverwaltung"', () => {
    expect(testHostFixture.nativeElement.querySelector('#h1InAppTitle').innerText).toEqual('Inventarverwaltung');
  });

  it('should show correct weekdays', () => {
    expect()
  })


  @Component({
    selector: 'host-component',
    template: '<app-header [objHeaderData]="objHeaderData"> </app-header>'
  })
  class TestHostComponent {

    objHeaderData : HeaderData;

    constructor() {

      let strTitle   : string = "Inventarverwaltung";
      let strPath    : string = "Startseite";
      let strMessage : string = "Hallo Administrator, was möchten Sie tun?";

      this.objHeaderData = new HeaderData(strTitle, strPath, strMessage);
    }

  }

});
