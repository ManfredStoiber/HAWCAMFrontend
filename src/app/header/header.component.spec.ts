import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HeaderData } from '../headerData.model';
import { Component } from '@angular/core';


describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let headerFixture: ComponentFixture<HeaderComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TestHostComponent
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
  });


  it('should create', () => {
    expect(headerComponent).toBeTruthy();
  });


  it('should have a title with "Inventarverwaltung"', () => {
    expect(testHostFixture.nativeElement.querySelector('#h1InAppTitle').innerText).toEqual('Inventarverwaltung');
  });



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
