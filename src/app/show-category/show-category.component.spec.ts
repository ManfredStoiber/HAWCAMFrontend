import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import { ShowCategoryComponent } from './show-category.component';

describe('ShowCategoryComponent', () => {
  let component: ShowCategoryComponent;
  let fixture: ComponentFixture<ShowCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCategoryComponent ],
      imports: [ReactiveFormsModule ],
      providers: [{provide: Router}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
