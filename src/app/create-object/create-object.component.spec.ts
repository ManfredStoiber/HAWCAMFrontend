import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateObjectComponent } from './create-object.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CreateObjectComponent', () => {
  let component: CreateObjectComponent;
  let fixture: ComponentFixture<CreateObjectComponent>;

  let submitButtonElement: DebugElement;
  let formSpy;
  let onSubmitMethodSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateObjectComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [{provide: DataService, useClass: DataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formSpy = spyOn(component.form, 'getRawValue').and.returnValue({
      "objCatName": "TestKategorie",
      "contentDescriptions": [
        {"hiddenIndex": 0, "optionalOrMandatory": "mandatory"},
        {"hiddenIndex": 0, "optionalOrMandatory": "optional"},
        {"hiddenIndex": 1}
      ]});

      onSubmitMethodSpy = spyOn(component, 'onSubmit').and.callThrough();

      submitButtonElement = fixture.debugElement.query(By.css('button[type="submit"]'));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit() on button pressed and process data', () => {

        expect(submitButtonElement.nativeElement.textContent).toBe('Fertig!');
        // enable button to be able to click
        submitButtonElement.nativeElement.disabled = false;
        submitButtonElement.nativeElement.click();
        expect(onSubmitMethodSpy).toHaveBeenCalled();
        expect(component.form.getRawValue).toHaveBeenCalled();
  })
});

class RESTServiceMock {
  putToRESTService(strPathending: String, jsonData: JSON) {}
}


class DataServiceMock {

  private jsonAttributes: JSON = null;

  constructor() {
    let obj = {
      "attributes": [
        {"name": "TestDetail 1", "mandatory": 0},
        {"name": "TestDetail 2", "mandatory": 0, "typ": "dateAndTime"},
        {"name": "TestDetail 3", "mandatory": 1},
        {"name": "TestDetail 4", "mandatory": 1, "typ": "dateAndTime"},
        {"name": "TestDetail 4", "mandatory": 2}
      ]
    };

    // what is this bullshit!?
    this.jsonAttributes = JSON.parse(JSON.stringify(obj));
  }

  public getJsonCatAttributes(): JSON {
    return this.jsonAttributes;
  }

  public setJsonCatAttributes( jsonAttributes: JSON) {
    this.jsonAttributes = jsonAttributes;
  }



}
