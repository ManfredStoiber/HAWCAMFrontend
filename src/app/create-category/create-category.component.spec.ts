import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryComponent } from './create-category.component';
import { Component } from '@angular/core';

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateCategoryComponent,
        MockCreateCategoryForms
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@Component({
  selector: 'app-create-category-forms',
  template: ''
})
class MockCreateCategoryForms {
}
