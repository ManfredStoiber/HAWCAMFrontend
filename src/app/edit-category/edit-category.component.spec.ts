import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Location} from '@angular/common';
import { EditCategoryComponent } from './edit-category.component';

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;


  let locationBackSpy;
  let confirmDialogSpy;
  let alertSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [ {provide: Location, useClass: LocationStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    locationBackSpy = spyOn(TestBed.get(Location), "back");
    alertSpy = spyOn(window, "alert");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

class LocationStub {
  back() {}
}
