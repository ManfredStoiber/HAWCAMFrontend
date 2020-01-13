import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Location} from '@angular/common';
import { EditCategoryComponent } from './edit-category.component';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { RESTService } from '../rest.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;

  let submitButtonElement: DebugElement;

  let locationBackSpy;
  let confirmDialogSpy;
  let alertSpy;
  let formSpy;
  let serviceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}, {provide: RESTService, useClass: RESTServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formSpy = spyOn(component.form, 'getRawValue').and.returnValue({
      "objCatName": "TestKategorie",
      "contentDescriptions": [
        {"hiddenIndex": 0, "optionalOrMandatory": "mandatory"},
        {"hiddenIndex": 0, "optionalOrMandatory": "optional"},
        {"hiddenIndex": 1}
      ]});
    locationBackSpy = spyOn(TestBed.get(Location), "back");
    alertSpy = spyOn(window, "alert");
    serviceSpy = spyOn(TestBed.get(RESTService), 'putToRESTService').and.callThrough();
    spyOn(component, 'onSubmit').and.callThrough();

    submitButtonElement = fixture.debugElement.query(By.css('button[type="submit"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() on button click and process values', () => {

    expect(submitButtonElement.nativeElement.textContent).toBe('Fertig!');
    // enable button to be able to click
    submitButtonElement.nativeElement.disabled = false;
    submitButtonElement.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.form.getRawValue).toHaveBeenCalled();
    expect(component.form.getRawValue().contentDescriptions.length).toEqual(3);
    expect(serviceSpy).toHaveBeenCalled();
    expect(component.contentDescriptions.length).toEqual(5);

  });

  it('should have working error-handling', () => {
    component.checkResponse(null);
    expect(alertSpy).toHaveBeenCalledWith("Kategorie konnte nicht geändert werden");
    alertSpy.calls.reset();

    component.checkResponse(JSON.parse(JSON.stringify({"Fehler": "Beispielfehler"})));
    expect(alertSpy).toHaveBeenCalledWith("Kategorie konnte nicht geändert werden");
    alertSpy.calls.reset();

    component.checkResponse(JSON.parse(JSON.stringify({"message": "ok"})));
    expect(alertSpy).toHaveBeenCalledWith("Kategorie erfolgreich geändert");
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

describe('EditCategoryComponent with no values', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;

  let alertSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Router, useClass: RouterStub}, {provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;

    alertSpy = spyOn(window, "alert");
    spyOn(TestBed.get(DataService), "getJsonCatAttributes");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(alertSpy).toHaveBeenCalledWith("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
  });

});

describe('EditCategoryComponent with error', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;

  let alertSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Router, useClass: RouterStub}, {provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;

    alertSpy = spyOn(window, "alert");
    spyOn(TestBed.get(DataService), "getJsonCatAttributes").and.returnValue({"Fehler": "Testfehler"});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(alertSpy).toHaveBeenCalledWith("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
  });

});

class DataServiceMock {

  getJsonCatAttributes() {
    return {"attributes": [
      {"mandatory": "0"},
      {"mandatory": "0", "typ": "dateAndTime", "name": "Testdetail 1"},
      {"mandatory": "1"},
      {"mandatory": "1", "typ": "dateAndTime", "name": "Testdetail 2"},
      {"mandatory": "x"},
    ]};
  }
}

class LocationStub {
  back() {}
}

class RESTServiceMock {

  putToRESTService( strInput:string, jsonData: JSON ) {
    return of ( jsonData );
  };
}

class RouterStub {
  navigate(destination: String) {}
}
