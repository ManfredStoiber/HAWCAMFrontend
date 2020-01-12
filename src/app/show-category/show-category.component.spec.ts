import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import { ShowCategoryComponent } from './show-category.component';
import { DataService } from '../data.service';

describe('ShowCategoryComponent', () => {
  let component: ShowCategoryComponent;
  let fixture: ComponentFixture<ShowCategoryComponent>;

  let routerNavigateSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCategoryComponent ],
      imports: [ReactiveFormsModule ],
      providers: [{provide: Router, useClass: RouterStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoryComponent);
    component = fixture.componentInstance;
    routerNavigateSpy = spyOn(TestBed.get(Router), "navigate");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open EditCategoryComponent', () => {
    component.openEditCategoryComponent();
    expect(routerNavigateSpy).toHaveBeenCalledWith(["/editCategory"]);
  });
});


describe('ShowCategoryComponent with no values', () => {
  let component: ShowCategoryComponent;
  let fixture: ComponentFixture<ShowCategoryComponent>;

  let alertSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCategoryComponent ],
      imports: [ReactiveFormsModule],
      providers: [{provide: Router, useClass: RouterStub}, {provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoryComponent);
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

describe('ShowCategoryComponent with error', () => {
  let component: ShowCategoryComponent;
  let fixture: ComponentFixture<ShowCategoryComponent>;

  let alertSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCategoryComponent ],
      imports: [ReactiveFormsModule],
      providers: [{provide: Router, useClass: RouterStub}, {provide: Location, useClass: LocationStub}, {provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoryComponent);
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

class RouterStub {
  navigate(destination: String) {}
}
