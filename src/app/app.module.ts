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
    CreateCategoryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
