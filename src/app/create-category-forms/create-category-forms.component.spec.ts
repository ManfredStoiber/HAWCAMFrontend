import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryFormsComponent } from './create-category-forms.component';

describe('CreateCategoryFormsComponent', () => {
  let component: CreateCategoryFormsComponent;
  let fixture: ComponentFixture<CreateCategoryFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryFormsComponent ]
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
