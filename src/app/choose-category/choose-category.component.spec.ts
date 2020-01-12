import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'
import { ChooseCategoryComponent } from './choose-category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RESTService } from '../rest.service';
import { By } from '@angular/platform-browser';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

describe('ChooseCategoryComponent', () => {
  let component: ChooseCategoryComponent;
  let fixture: ComponentFixture<ChooseCategoryComponent>;

  let buttonTestCat1;
  let buttonTestCat2;

  let putToRESTServiceSpy;
  let getFromRESTServiceSpy;

  let httpMock: HttpTestingController;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCategoryComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [{provide: RESTService, useClass: RESTServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ChooseCategoryComponent);
    component = fixture.componentInstance;
    spyOn(component, "ngOnInit").and.callThrough();
    getFromRESTServiceSpy = spyOn(TestBed.get(RESTService), "getFromRESTService").and.callThrough();
    putToRESTServiceSpy = spyOn(TestBed.get(RESTService), "putToRESTService").and.callThrough();
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
  })
});

class RESTServiceMock {

  putToRESTService(strPathending: String, jsonData: JSON) {}
  getFromRESTService() {
    return of({
      "categories": [
        {"count": 0, "name": "Testkategorie1"},
        {"count": 10, "name": "Testkategorie2"}
      ]
    });

  }
}
