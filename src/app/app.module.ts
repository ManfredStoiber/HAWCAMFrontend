import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartButtonsComponent } from './start-buttons/start-buttons.component';
import { HeaderComponent } from './header/header.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    StartButtonsComponent,
    HeaderComponent,
    ListCategoriesComponent,
    NotFoundComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
