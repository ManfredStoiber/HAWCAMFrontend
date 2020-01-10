import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Location} from '@angular/common';
import { EditObjectComponent } from './edit-object.component';


describe('EditObjectComponent', () => {
  let component: EditObjectComponent;
  let fixture: ComponentFixture<EditObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObjectComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Location}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
