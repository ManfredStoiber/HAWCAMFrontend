import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryEditorComponent } from './create-category-editor.component';

describe('CreateCategoryEditorComponent', () => {
  let component: CreateCategoryEditorComponent;
  let fixture: ComponentFixture<CreateCategoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
