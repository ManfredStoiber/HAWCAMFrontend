import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateObjectComponent } from './create-object.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {Location} from '@angular/common';

describe('CreateObjectComponent', () => {
  let component: CreateObjectComponent;
  let fixture: ComponentFixture<CreateObjectComponent>;

  let submitButtonElement: DebugElement;
  let formSpy;
  let onSubmitMethodSpy;
  let locationBackSpy;
  let confirmDialogSpy;
  let alertSpy;
  let initialiseScreenWithJSONSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateObjectComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [{provide: DataService, useClass: DataServiceMock}, {provide: Location, useClass: LocationStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formSpy = spyOn(component.form, 'getRawValue').and.returnValue({
      "objCatName": "TestKategorie",
      "contentDescriptions": [
        {"hiddenIndex": 0, "optionalOrMandatory": "mandatory"},
        {"hiddenIndex": 0, "optionalOrMandatory": "optional"},
        {"hiddenIndex": 1}
      ]});

      onSubmitMethodSpy = spyOn(component, 'onSubmit').and.callThrough();
      locationBackSpy = spyOn(TestBed.get(Location), "back");
      initialiseScreenWithJSONSpy = spyOn(component, 'initialiseScreenWithJSON').and.callThrough();
      alertSpy = spyOn(window, "alert");

      submitButtonElement = fixture.debugElement.query(By.css('button[type="submit"]'));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have working ngOnInit', () => {

    let dataService = TestBed.get(DataService);

    dataService.setJsonCatAttributes(null);
    component.ngOnInit();
    expect(window.alert).toHaveBeenCalledWith("Kategorien konnten nicht geladen werden");

    let jsonTemp: JSON = JSON.parse('{"Fehler":"Test"}');
    dataService.setJsonCatAttributes(jsonTemp);
    component.ngOnInit();
    expect(window.alert).toHaveBeenCalledWith("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");

    jsonTemp = JSON.parse('{"attributes": [ {"name": "TestDetail 1", "mandatory": 0}, {"name": "TestDetail 2", "mandatory": 0, "typ": "dateAndTime"} ] }' );
    dataService.setJsonCatAttributes(jsonTemp);
    component.ngOnInit();
    expect(initialiseScreenWithJSONSpy).toHaveBeenCalledWith();

  });


  it('should call submit() on button pressed and process data', () => {

        expect(submitButtonElement.nativeElement.textContent).toBe('Fertig!');
        // enable button to be able to click
        submitButtonElement.nativeElement.disabled = false;
        submitButtonElement.nativeElement.click();
        expect(onSubmitMethodSpy).toHaveBeenCalled();
        expect(component.form.getRawValue).toHaveBeenCalled();
  });


  it('should have working error-handling', () => {
    component.checkResponse(null);
    expect(alertSpy).toHaveBeenCalledWith("Objekt konnte nicht gespeichert werden");
    alertSpy.calls.reset();

    component.checkResponse(JSON.parse(JSON.stringify({"Fehler": "Beispielfehler"})));
    expect(window.alert).toHaveBeenCalledWith("Objekt konnte nicht gespeichert werden");
    alertSpy.calls.reset();

    component.checkResponse(JSON.parse(JSON.stringify({"message": "ok"})));
    expect(window.alert).toHaveBeenCalledWith("Objekt erfolgreich erstellt");
    alertSpy.calls.reset();
  });


  it('should have working abort-button', () => {
    confirmDialogSpy = spyOn(window, "confirm").and.returnValue(true);
    component.abort();
    expect(confirmDialogSpy).toHaveBeenCalledWith("Sie verlassen diese Seite und verwerfen alle nicht gespeicherten Eingaben");
    expect(locationBackSpy).toHaveBeenCalled();

    // reset spies and chose "no" in next confirm dialog
    confirmDialogSpy.calls.reset();
    confirmDialogSpy.and.returnValue(false);
    locationBackSpy.calls.reset();
    component.abort();
    expect(confirmDialogSpy).toHaveBeenCalledWith("Sie verlassen diese Seite und verwerfen alle nicht gespeicherten Eingaben");
    expect(locationBackSpy).not.toHaveBeenCalled();

  });
});

class LocationStub {
  back() {}
}

class RESTServiceMock {
  putToRESTService(strPathending: String, jsonData: JSON) {}
}


class DataServiceMock {

  private jsonAttributes: JSON = null;

  constructor() {
    let obj = {
      "attributes": [
        {"name": "TestDetail 1", "mandatory": 0},
        {"name": "TestDetail 2", "mandatory": 0, "typ": "dateAndTime"},
        {"name": "TestDetail 3", "mandatory": 1},
        {"name": "TestDetail 4", "mandatory": 1, "typ": "dateAndTime"},
        {"name": "TestDetail 4", "mandatory": 2}
      ]
    };

    // what is this bullshit!?
    this.jsonAttributes = JSON.parse(JSON.stringify(obj));
  }

  public getJsonCatAttributes(): JSON {
    return this.jsonAttributes;
  }

  public setJsonCatAttributes( jsonAttributes: JSON) {
    this.jsonAttributes = jsonAttributes;
  }



}
