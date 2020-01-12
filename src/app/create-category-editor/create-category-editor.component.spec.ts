import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryEditorComponent } from './create-category-editor.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { RESTService } from '../rest.service';
import {Location} from '@angular/common';

describe('CreateCategoryEditorComponent', () => {
  let component: CreateCategoryEditorComponent;
  let fixture: ComponentFixture<CreateCategoryEditorComponent>;

  let catNameInputElement: DebugElement;
  let submitButtonElement: DebugElement;

  let serviceSpy;
  let formSpy;
  let onSubmitMethodSpy;
  let alertSpy;
  let locationBackSpy;
  let confirmDialogSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryEditorComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: RESTService, useClass: RestServiceMock}, {provide: Location, useClass: LocationStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = spyOn(TestBed.get(RESTService), 'putToRESTService').and.callThrough();
    fixture = TestBed.createComponent(CreateCategoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


    locationBackSpy = spyOn(TestBed.get(Location), "back");
    alertSpy = spyOn(window, "alert");

    onSubmitMethodSpy = spyOn(component, 'onSubmit').and.callThrough();

    formSpy = spyOn(component.form, 'getRawValue').and.returnValue({
      "objCatName": "TestKategorie",
      "contentDescriptions": [
        {"hiddenIndex": 0, "optionalOrMandatory": "mandatory"},
        {"hiddenIndex": 0, "optionalOrMandatory": "optional"},
        {"hiddenIndex": 1}
      ]});

    catNameInputElement = fixture.debugElement.query(By.css('input[formControlName="objCatName"]'));
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
    expect(component.contentDescriptions.length).toEqual(0);

  });

  it('should have working error-handling', () => {
    component.checkResponse(null);
    expect(alertSpy).toHaveBeenCalledWith("Kategorie konnte nicht gespeichert werden");
    alertSpy.calls.reset();

    component.checkResponse(JSON.parse(JSON.stringify({"Fehler": "Beispielfehler"})));
    expect(window.alert).toHaveBeenCalledWith("Kategorie konnte nicht gespeichert werden");
    alertSpy.calls.reset();

    component.checkResponse(JSON.parse(JSON.stringify({"message": "ok"})));
    expect(window.alert).toHaveBeenCalledWith("Kategorie erfolgreich erstellt");
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

class RestServiceMock {
  putToRESTService(strPathending: String, jsonData: JSON) {}
}

class LocationStub {
  back() {}
}
