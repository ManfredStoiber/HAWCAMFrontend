import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateObjectComponent } from './create-object.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';

describe('CreateObjectComponent', () => {
  let component: CreateObjectComponent;
  let fixture: ComponentFixture<CreateObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateObjectComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [{provide: DataService, useClass: DataServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


class DataServiceStub {

  private jsonAttributes: JSON = null;

  constructor() { 
    this.jsonAttributes = JSON.parse('{"attributes": []}');
  }

  public getJsonAttributes(): JSON {
    return this.jsonAttributes;
  }

  public setJsonAttributes( jsonAttributes: JSON) {
    this.jsonAttributes = jsonAttributes;
  }



}
