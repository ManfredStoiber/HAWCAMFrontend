import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import { ShowCategoryComponent } from './show-category.component';

describe('ShowCategoryComponent', () => {
  let component: ShowCategoryComponent;
  let fixture: ComponentFixture<ShowCategoryComponent>;

  let routerNavigateSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCategoryComponent ],
      imports: [ReactiveFormsModule ],
      providers: [{provide: Router, useClass: RouterStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoryComponent);
    component = fixture.componentInstance;
    routerNavigateSpy = spyOn(TestBed.get(Router), "navigate");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open EditCategoryComponent', () => {
    component.openEditCategoryComponent();
    expect(routerNavigateSpy).toHaveBeenCalledWith(["/editCategory"]);
  });
});

class RouterStub {
  navigate(destination: String) {}
}
