import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShowObjectComponent } from './show-object.component';

describe('ShowObjectComponent', () => {
  let component: ShowObjectComponent;
  let fixture: ComponentFixture<ShowObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowObjectComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [{provide: Router}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
