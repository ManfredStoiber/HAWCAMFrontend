import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShowObjectComponent } from './show-object.component';
import { DataService } from '../data.service';

describe('ShowObjectComponent', () => {
  let component: ShowObjectComponent;
  let fixture: ComponentFixture<ShowObjectComponent>;

  let routerNavigateSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowObjectComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [{provide: Router, useClass: RouterStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowObjectComponent);
    component = fixture.componentInstance;
    routerNavigateSpy = spyOn(TestBed.get(Router), "navigate");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open EditObjectComponent', () => {
    component.openEditObjectComponent();
    expect(routerNavigateSpy).toHaveBeenCalledWith(["/editObject"]);
  });
});

describe('ShowObjectComponent with no values', () => {
  let component: ShowObjectComponent;
  let fixture: ComponentFixture<ShowObjectComponent>;

  let alertSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowObjectComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Router, useClass: RouterStub}, {provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowObjectComponent);
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

describe('ShowObjectComponent with error', () => {
  let component: ShowObjectComponent;
  let fixture: ComponentFixture<ShowObjectComponent>;

  let alertSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowObjectComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Router, useClass: RouterStub}, {provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowObjectComponent);
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

class RouterStub {
  navigate(destination: String) {}
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
