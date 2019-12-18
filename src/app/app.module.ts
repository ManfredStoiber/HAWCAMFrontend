import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { PathComponent } from './path/path.component';
import { DateComponent } from './date/date.component';
import { MessageComponent } from './message/message.component';
import { StartButtonsComponent } from './start-buttons/start-buttons.component';
import { HeaderComponent } from './header/header.component';
import { CreateCategoryFormsComponent } from './create-category-forms/create-category-forms.component';
import { CreateCategoryEditorComponent } from './create-category-editor/create-category-editor.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule }
from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule} from '@angular/material';


const modules: any[] = [

  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,

  MatNativeDateModule,
  // MatMomentDateModule,



];

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    PathComponent,
    DateComponent,
    MessageComponent,
    StartButtonsComponent,
    HeaderComponent,
    CreateCategoryFormsComponent,
    CreateCategoryEditorComponent,
    CreateCategoryComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
