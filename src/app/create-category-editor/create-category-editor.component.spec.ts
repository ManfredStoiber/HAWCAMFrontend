import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryEditorComponent } from './create-category-editor.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { RESTService } from '../rest.service';
import {Location} from '@angular/common';

describe('CreateCategoryEditorComponent', () => {
  let component: CreateCategoryEditorComponent;
  let fixture: ComponentFixture<CreateCategoryEditorComponent>;

  //let form: MockForm;

  let catNameInputElement: DebugElement;
  let submitButtonElement: DebugElement;

  let serviceSpy;
  let formSpy;
  let onSubmitMethodSpy;

  let mockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryEditorComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: RESTService, useClass: RestServiceMock}, {provide: Location}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockService = TestBed.get(RESTService);
    serviceSpy = spyOn(TestBed.get(RESTService), 'putToRESTService').and.callThrough();
    fixture = TestBed.createComponent(CreateCategoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();





    onSubmitMethodSpy = spyOn(component, 'onSubmit').and.callThrough();

    formSpy = spyOn(component.form, 'getRawValue').and.returnValue({
      "objCatName": "TestKategorie",
      "contentDescriptions": [
        {"hiddenIndex": 0, "optionalOrMandatory": "mandatory"},
        {"hiddenIndex": 0, "optionalOrMandatory": "optional"},
        {"hiddenIndex": 1}
      ]});//.and.callFake(() => {console.log("Aufruf!!!!!")});

    catNameInputElement = fixture.debugElement.query(By.css('input[formControlName="objCatName"]'));
    submitButtonElement = fixture.debugElement.query(By.css('button[type="submit"]'));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() on button click and process values', () => {

    expect(submitButtonElement.nativeElement.textContent).toBe('Fertig!');
    // enable button to be able to click
    submitButtonElement.nativeElement.disabled = false;
    submitButtonElement.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.form.getRawValue).toHaveBeenCalled();
    expect(component.form.getRawValue().contentDescriptions.length).toEqual(3);
    expect(mockService.putToRESTService).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
    expect(component.contentDescriptions.length).toEqual(0);

  });
});

class RestServiceMock {
  putToRESTService(strPathending: String, jsonData: JSON) {}
}
