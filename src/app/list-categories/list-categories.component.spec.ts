import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ListCategoriesComponent } from './list-categories.component';
import { of } from 'rxjs/internal/observable/of';
import { RESTService } from '../rest.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

describe('ListCategoriesComponent', () => {

  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;

  let getFromRESTServiceSpy;
  let alertSpy;
  let dataServiceSetJsonCatAttributesSpy;
  let routerNavigateSpy;
  let putToRESTServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ ListCategoriesComponent ],
      providers: [ {provide: RESTService, useClass: RESTServiceMock}, {provide: Router, useClass: RouterStub}, {provide: DataService, useClass: DataServiceStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriesComponent);

    component = fixture.componentInstance;
    getFromRESTServiceSpy = spyOn(TestBed.get(RESTService), "getFromRESTService").and.callThrough();
    putToRESTServiceSpy =  spyOn(TestBed.get(RESTService), "putToRESTService").and.callThrough();
    alertSpy = spyOn(window, "alert");
    dataServiceSetJsonCatAttributesSpy = spyOn(TestBed.get(DataService), "setJsonCatAttributes");
    routerNavigateSpy = spyOn(TestBed.get(Router), "navigate");

    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get categories from restService', () => {
    expect(getFromRESTServiceSpy).toHaveBeenCalled();
  });


  it('should get attributes for chosen category', () => {

    let strErrorString: string = " Falscher " + '"' + " String";
    component.listAttributesForCategory( strErrorString );
    expect(window.alert).toHaveBeenCalledWith('Fehler bei Kategorieauswahl');

    let strValidString: string = "Raum";
    let strTemp: string = ' {"catName":"' + "'" + strValidString + "'" + '"}';

    component.listAttributesForCategory( strValidString );
    expect(putToRESTServiceSpy).toHaveBeenCalledWith( "listAttributesForCategory", JSON.parse(strTemp) );


  });



  it('should have working error-handling', () => {

    // test checkResponsePUT
    component.checkResponsePUT(null);
    expect(alertSpy).toHaveBeenCalledWith("Kategorie konnte nicht geladen werden");
    alertSpy.calls.reset();

    component.checkResponsePUT(JSON.parse(JSON.stringify({"Fehler": "Beispielfehler"})));
    expect(alertSpy).toHaveBeenCalledWith("Kategorie konnte nicht geladen werden");
    alertSpy.calls.reset();

    component.checkResponsePUT(JSON.parse(JSON.stringify({"message": "ok"})));
    expect(dataServiceSetJsonCatAttributesSpy).toHaveBeenCalledWith(JSON.parse(JSON.stringify({"message": "ok"})));
    alertSpy.calls.reset();

    // test checkResponseGET
    component.checkResponseGET(null);
    expect(alertSpy).toHaveBeenCalledWith("Kategorien konnten nicht geladen werden");
    alertSpy.calls.reset();

    component.checkResponseGET(JSON.parse(JSON.stringify({"Fehler": "Beispielfehler"})));
    expect(alertSpy).toHaveBeenCalledWith("Kategorien konnten nicht geladen werden");
    alertSpy.calls.reset();
  });

});

class RESTServiceMock {



  getFromRESTService() {
    return of({
      "categories": [
        {"count": 0, "name": "Testkategorie1"},
        {"count": 10, "name": "Testkategorie2"}
      ]
    });
  }

  putToRESTService( strInput:string, jsonData: JSON ) {
    return of ( jsonData );
  };

}

class DataServiceStub {
  setJsonCatAttributes(json: JSON) {}
}

class RouterStub {
  navigate(destination: String) {}
}
