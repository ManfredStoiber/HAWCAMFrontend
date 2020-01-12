import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Location} from '@angular/common';
import { EditObjectComponent } from './edit-object.component';
import { DataService } from '../data.service';


describe('EditObjectComponent with correct values', () => {
  let component: EditObjectComponent;
  let fixture: ComponentFixture<EditObjectComponent>;

  let locationBackSpy;
  let confirmDialogSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObjectComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObjectComponent);
    component = fixture.componentInstance;

    locationBackSpy = spyOn(TestBed.get(Location), "back");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

describe('EditObjectComponent with no values', () => {
  let component: EditObjectComponent;
  let fixture: ComponentFixture<EditObjectComponent>;

  let alertSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObjectComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObjectComponent);
    component = fixture.componentInstance;

    alertSpy = spyOn(window, "alert");
    spyOn(TestBed.get(DataService), "getObjectDetails");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(alertSpy).toHaveBeenCalledWith("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
  });

});

describe('EditObjectComponent with error', () => {
  let component: EditObjectComponent;
  let fixture: ComponentFixture<EditObjectComponent>;

  let alertSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObjectComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObjectComponent);
    component = fixture.componentInstance;

    alertSpy = spyOn(window, "alert");
    spyOn(TestBed.get(DataService), "getObjectDetails").and.returnValue({"Fehler": "Testfehler"});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(alertSpy).toHaveBeenCalledWith("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
  });

});

class LocationStub {
  back() {}
}

class DataServiceMock {
  getObjectDetails() {
    return {"details": [
      {"mandatory": "0"},
      {"mandatory": "0", "typ": "dateAndTime", "name": "Testdetail 1"},
      {"mandatory": "1"},
      {"mandatory": "1", "typ": "dateAndTime", "name": "Testdetail 2"},
      {"mandatory": "x"},
    ]};
  }
}
