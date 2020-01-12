import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HeaderData } from '../headerData.model';
import { Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';


describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let headerFixture: ComponentFixture<HeaderComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  let backButtonElement: DebugElement;
  let callBackFunctionSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TestHostComponent
      ],
      imports: [RouterTestingModule],
      providers: [
        {provide: Location, useClass: LocationStub}
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

    backButtonElement = headerFixture.debugElement.query(By.css('button[type="button"]'));
    callBackFunctionSpy = spyOn(headerComponent, 'clickedBack').and.callThrough();

  });


  it('should create', () => {
    expect(headerComponent).toBeTruthy();
  });


  it('should have a title with "Inventarverwaltung"', () => {
    expect(testHostFixture.nativeElement.querySelector('#h1InAppTitle').innerText).toEqual('Inventarverwaltung');
  });


  it('should call the back function"', () => {
    expect(backButtonElement.nativeElement.textContent).toBe('Zurück');
    backButtonElement.nativeElement.click();
    expect(headerComponent.clickedBack).toHaveBeenCalled();
  });


  it('should show correct weekdays', () => {
    // Monday
    let baseTime = new Date(2020, 0, 6);
    jasmine.clock().mockDate(baseTime);
    headerComponent.setStrDateTime();
    expect(headerComponent.strDatetime).toEqual("Montag, der 6.1.2020");

    // Tuesday
    baseTime = new Date(2020, 0, 7);
    jasmine.clock().mockDate(baseTime);
    headerComponent.setStrDateTime();
    expect(headerComponent.strDatetime).toEqual("Dienstag, der 7.1.2020");

    // Wednesday
    baseTime = new Date(2020, 0, 8);
    jasmine.clock().mockDate(baseTime);
    headerComponent.setStrDateTime();
    expect(headerComponent.strDatetime).toEqual("Mittwoch, der 8.1.2020");

    // Thursday
    baseTime = new Date(2020, 0, 9);
    jasmine.clock().mockDate(baseTime);
    headerComponent.setStrDateTime();
    expect(headerComponent.strDatetime).toEqual("Donnerstag, der 9.1.2020");

    // Friday
    baseTime = new Date(2020, 0, 10);
    jasmine.clock().mockDate(baseTime);
    headerComponent.setStrDateTime();
    expect(headerComponent.strDatetime).toEqual("Freitag, der 10.1.2020");

    // Saturday
    baseTime = new Date(2020, 0, 11);
    jasmine.clock().mockDate(baseTime);
    headerComponent.setStrDateTime();
    expect(headerComponent.strDatetime).toEqual("Samstag, der 11.1.2020");

    // Sunday
    baseTime = new Date(2020, 0, 12);
    jasmine.clock().mockDate(baseTime);
    headerComponent.setStrDateTime();
    expect(headerComponent.strDatetime).toEqual("Sonntag, der 12.1.2020");

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


  class LocationStub {
    back() { }
  }

});
