import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RESTService } from '../rest.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let submitButtonElement: DebugElement;

  let checkAlertSpy;
  let dataServiceObjectSpy;
  let dataServiceCategorySpy;
  let routerSpy;
  let serviceSpy;
  let checkResponsePUTMethodSpy;
  let onSubmitMethodSpy;
  let formSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [ {provide: DataService, useClass: DataServiceMock}, {provide: RESTService, useClass: RestServiceMock}, {provide: Router, useClass: RouterMock} ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    submitButtonElement = fixture.debugElement.query(By.css('button[type="submit"]'));

    checkAlertSpy   = spyOn(window, 'alert').and.callThrough();
    dataServiceObjectSpy    = spyOn( TestBed.get(DataService), 'setObjectDetails');
    dataServiceCategorySpy  = spyOn( TestBed.get(DataService), 'setJsonCatAttributes');
    routerSpy   = spyOn( TestBed.get(Router), 'navigate');
    serviceSpy  = spyOn( TestBed.get(RESTService), 'putToRESTService').and.callThrough();
    checkResponsePUTMethodSpy     = spyOn(component, 'checkResponsePUT').and.callThrough();

    onSubmitMethodSpy = spyOn(component, 'onSubmit').and.callThrough();
    formSpy = spyOn(component.form, 'getRawValue').and.returnValue(
        {"search": "Teststring"}
    );

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call onSubmit() on button click and process values', () => {

    expect(submitButtonElement.nativeElement.textContent).toBe('Suchen');
    // enable button to be able to click
    submitButtonElement.nativeElement.disabled = false;
    submitButtonElement.nativeElement.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.form.getRawValue).toHaveBeenCalled();
    expect(component.form.getRawValue().search).toBe("Teststring");

    let strTemp: string = ' { "search":"' + "'" + component.form.getRawValue().search + "'" + '" }';
    expect(serviceSpy).toHaveBeenCalledWith("search", JSON.parse(strTemp) );

    strTemp = ' { "search":"' + "'" + component.form.getRawValue().search +  "'" + "'" + '" }';
    expect(window.alert).toHaveBeenCalledWith('Suche konnte nicht durchgeführt werden, Fehler bei Eingabe');

  });


  it('should have working checkResponseSearch()', () => {

    let jsonTemp: JSON = null;
    component.checkResponseSearch(null)
    expect(window.alert).toHaveBeenCalledWith('Suche konnte nicht durchgeführt werden');

    jsonTemp = JSON.parse('{"Fehler":"Testfehler"}');
    component.checkResponseSearch(jsonTemp);
    expect(window.alert).toHaveBeenCalledWith('Suche konnte nicht durchgeführt werden');

    jsonTemp = JSON.parse('{"categories": [ {"name": "Raum"}, {"name": "Raumtisch"} ], "objects": [ {"name": "Raum1", "cat":"Raum"} ] }');
    component.checkResponseSearch(jsonTemp);
    expect(component.objSearchResult).toBe(jsonTemp);

  });


  it('should have working showObject()', () => {

    let strErrorString: string = " Falscher " + '"' + " String";
    component.showObject( strErrorString );
    expect(window.alert).toHaveBeenCalledWith('Fehler bei Objektauswahl');

    let strValidString: string = "R123";
    let strTemp: string = ' {"objName":"' + "'" + strValidString + "'" + '"}';

    component.showObject( strValidString );
    expect(serviceSpy).toHaveBeenCalledWith("listObjectDetails", JSON.parse(strTemp) );

    // not sure how to do this
    // expect(checkResponsePUTSpy).toHaveBeenCalled();

  });


  it('should have working showCategory()', () => {

    let strErrorString: string = " Falscher " + '"' + " String";
    component.showCategory( strErrorString );
    expect(window.alert).toHaveBeenCalledWith('Fehler bei Kategorieauswahl');

    let strValidString: string = "Raum";
    let strTemp: string = ' {"catName":"' + "'" + strValidString + "'" + '"}';

    component.showCategory( strValidString );
    expect(serviceSpy).toHaveBeenCalledWith("listAttributesForCategory", JSON.parse(strTemp) );

    // not sure how to do this
    // expect(checkResponsePUTSpy).toHaveBeenCalled();

  });


  it('should have working checkResponsePUT()', () => {

    let jsonTemp: JSON = null;
    component.checkResponsePUT(null, "Test")
    expect(window.alert).toHaveBeenCalledWith('Test konnte nicht geladen werden');

    jsonTemp = JSON.parse('{"Fehler":"Testfehler"}');
    component.checkResponsePUT(jsonTemp, "Test");
    expect(window.alert).toHaveBeenCalledWith('Test konnte nicht geladen werden');

    jsonTemp = JSON.parse('{ "name":"R123", "details": [ {"name": "Bezeichung", "typ":"textfield", "mandatory":"1", "value":"R123"}, {"name": "Sitzform", "typ":"textfield", "mandatory":"0", "value":"U-Form" } ] }');
    component.checkResponsePUT(jsonTemp, "Test");
    expect(window.alert).toHaveBeenCalledWith('Unbekanntes Objekt konnte nicht geladen werden');

    jsonTemp = JSON.parse('{ "name":"R123", "details": [ {"name": "Bezeichung", "typ":"textfield", "mandatory":"1", "value":"R123"}, {"name": "Sitzform", "typ":"textfield", "mandatory":"0", "value":"U-Form" } ] }');
    component.checkResponsePUT(jsonTemp, "Object");
    expect(dataServiceObjectSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();

    jsonTemp = JSON.parse('{ "name":"Raum", "attributes": [ {"name": "Bezeichung", "typ":"Einfaches Textfeld", "mandatory":"1" }, {"name": "Hersteller", "typ":"Einfaches Textfeld", "mandatory":"0" } ] }');
    component.checkResponsePUT(jsonTemp, "Category");
    expect(dataServiceCategorySpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();

  });


});


class DataServiceMock {

  setObjectDetails( jsonResponse: JSON ) { }
  setJsonCatAttributes( jsonResponse: JSON ) { }

}

class RestServiceMock {

  putToRESTService( strPathending: String, jsonData: JSON ) {
  }

}

class RouterMock {
  navigate( commands: any[]) { }
}
