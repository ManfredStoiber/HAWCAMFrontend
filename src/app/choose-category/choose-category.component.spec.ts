import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'
import { ChooseCategoryComponent } from './choose-category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RESTService } from '../rest.service';
import { By } from '@angular/platform-browser';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';

describe('ChooseCategoryComponent', () => {
  let component: ChooseCategoryComponent;
  let fixture: ComponentFixture<ChooseCategoryComponent>;

  let buttonTestCat1;
  let buttonTestCat2;

  let checkAlertSpy;
  let putToRESTServiceSpy;
  let getFromRESTServiceSpy;
  let routerNavigateSpy;

  let httpMock: HttpTestingController;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCategoryComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [{provide: RESTService, useClass: RESTServiceMock}, {provide: Router, useClass: RouterStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ChooseCategoryComponent);
    component = fixture.componentInstance;

    spyOn(component, "ngOnInit").and.callThrough();
    checkAlertSpy   = spyOn(window, 'alert').and.callThrough();
    getFromRESTServiceSpy = spyOn(TestBed.get(RESTService), "getFromRESTService").and.callThrough();
    putToRESTServiceSpy = spyOn(TestBed.get(RESTService), "putToRESTService").and.callThrough();

    routerNavigateSpy = spyOn(TestBed.get(Router), "navigate");

    fixture.detectChanges();

    httpMock = TestBed.get(HttpTestingController);

    let buttons = fixture.debugElement.queryAll(By.css("button"));
    for (let b of buttons) {
      if(b.nativeElement.innerHTML == 'Testkategorie1') {
        buttonTestCat1 = b;
      } else if (b.nativeElement.innerHTML == 'Testkategorie2') {
        buttonTestCat2 = b;
      }
    }

    spyOn(component, "sendChosenCat").and.callThrough();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call sendChosenCat when category gets clicked', () => {

    expect(component.ngOnInit).toHaveBeenCalled();
    expect(getFromRESTServiceSpy).toHaveBeenCalled();
    buttonTestCat1.nativeElement.click();
    expect(component.sendChosenCat).toHaveBeenCalledWith("Testkategorie1");
    expect(putToRESTServiceSpy).toHaveBeenCalled();
  });


  it('should have working error handling', () => {

    let strErrorString: string = " Falscher " + '"' + " String";
    component.sendChosenCat( strErrorString );
    expect(component.sendChosenCat).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Auswahl konnte nicht durchgeführt werden, Fehler bei Eingabe');

    let strValidString: string = "Raum";
    let strTemp: string = ' {"catName":"' + "'" + strValidString + "'" + '"}';

    component.sendChosenCat( strValidString );
    expect(putToRESTServiceSpy).toHaveBeenCalledWith("listAttributesForCategory", JSON.parse(strTemp) );

    expect(routerNavigateSpy).toHaveBeenCalled();

  });


});



class RESTServiceMock {

  putToRESTService(strPathending: String, jsonData: JSON) {
    return of( {
      "name":"Raum",
      "attributes":
      [
          {"name": "Bezeichung", "typ":"Einfaches Textfeld", "mandatory":"1" },
          {"name": "Hersteller", "typ":"Einfaches Textfeld", "mandatory":"0" }
      ]
    } );
  }

  getFromRESTService() {
    return of({
      "categories": [
        {"count": 0, "name": "Testkategorie1"},
        {"count": 10, "name": "Testkategorie2"}
      ]
    });

  }
}


class RouterStub {
  navigate(destination: String) {}
}
