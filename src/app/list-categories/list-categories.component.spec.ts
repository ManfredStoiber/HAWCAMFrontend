import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ListCategoriesComponent } from './list-categories.component';
import { of } from 'rxjs/internal/observable/of';
import { RESTService } from '../rest.service';

describe('ListCategoriesComponent', () => {

  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;

  let getFromRESTServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ListCategoriesComponent ],
      providers: [{provide: RESTService, useClass: RESTServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    getFromRESTServiceSpy = spyOn(TestBed.get(RESTService), "getFromRESTService").and.callThrough();
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories from restService', () => {
    expect(getFromRESTServiceSpy).toHaveBeenCalled();
  })

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
}
