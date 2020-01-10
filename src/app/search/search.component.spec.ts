import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let checkSpy;
  let dataServiceObjectSpy;
  let dataServiceCategorySpy;
  let routerSpy

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [ {provide: DataService, useClass: DataServiceMock}, {provide: Router, useClass: RouterMock} ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    checkSpy = spyOn(window, 'alert').and.callThrough();
    dataServiceObjectSpy = spyOn( TestBed.get(DataService), 'setObjectDetails');
    dataServiceCategorySpy = spyOn( TestBed.get(DataService), 'setJsonCatAttributes');
    routerSpy = spyOn( TestBed.get(Router), 'navigate');

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have working checkResponsePUT', () => {

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

  })


});


class DataServiceMock {

  setObjectDetails(jsonResponse: JSON) { }
  setJsonCatAttributes(jsonResponse: JSON) { }

}

class RouterMock {
  navigate( commands: any[]) { }
}
