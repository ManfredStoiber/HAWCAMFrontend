import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// imports of other modules this module depends on
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule} from '@angular/material';


// declarations of components to module
import { AppComponent } from './app.component';
import { StartButtonsComponent } from './start-buttons/start-buttons.component';
import { HeaderComponent } from './header/header.component';
import { CreateCategoryFormsComponent } from './create-category-forms/create-category-forms.component';
import { CreateCategoryEditorComponent } from './create-category-editor/create-category-editor.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { CreateObjectComponent } from './create-object/create-object.component';


// declaration of services to module
import { RESTService } from './rest.service';
import { DataService } from './data.service';
import { HeaderData } from './headerData.model';
import { ShowObjectComponent } from './show-object/show-object.component';

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

  MatNativeDateModule
  // MatMomentDateModule,
];


@NgModule({
  declarations: [
    AppComponent,
    StartButtonsComponent,
    HeaderComponent,
    CreateCategoryFormsComponent,
    CreateCategoryEditorComponent,
    CreateCategoryComponent,
    ListCategoriesComponent,
    PageNotFoundComponent,
    ChooseCategoryComponent,
    CreateObjectComponent,
    ShowObjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
    MatFormFieldModule
  ],
  providers: [
    RESTService,
    DataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
