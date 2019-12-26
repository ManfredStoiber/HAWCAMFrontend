import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HeaderData } from '../headerData.model';
import { Component } from '@angular/core';
// import { element, by } from 'protractor';

describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let headerFixture: ComponentFixture<HeaderComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, TestHostComponent ]
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


  it('should create headerComponent with Input', async(() => {
    // provide inputs here
    headerComponent.objHeaderData = new HeaderData("Inventarverwaltung", "Startseite","Hallo Administrator, was möchten Sie tun?");
    expect(headerComponent).toBeTruthy();
  }));


  it('should have a title with "Inventarverwaltung"', () => {

    // testHostComponent.setObjHeaderData("Inventarverwaltung", "Startseite","Hallo Administrator, was möchten Sie tun?");
    // testHostFixture.detectChanges();
    // expect(testHostFixture.debugElement.nativeElement.querySelector('app-title').innerText).toEqual('Inventarverwaltung');
    // Cannot read property 'innerText' of null

    const appTitle = headerFixture.debugElement.nativeElement.querySelector('app-title');
    expect(appTitle.getText()).toBe('Inventarverwaltung');
  });


  @Component({
      selector: 'host-component',
      template: '<app-header [objHeaderData]="objHeaderData"></app-header>'
    })
    class TestHostComponent {
      private objHeaderData: HeaderData;

      setObjHeaderData(strTitle:string, strPath:string, strMessage:string) {
        this.objHeaderData = new HeaderData(strTitle, strPath, strMessage);
      }
  }


});
