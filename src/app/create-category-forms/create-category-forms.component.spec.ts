import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryFormsComponent } from './create-category-forms.component';
import { Component } from '@angular/core';

describe('CreateCategoryFormsComponent', () => {
  let component: CreateCategoryFormsComponent;
  let fixture: ComponentFixture<CreateCategoryFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateCategoryFormsComponent,
        StubCreateCategoryEditor
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@Component({
  selector: 'app-create-category-editor',
  template: ''
})
class StubCreateCategoryEditor {
}
