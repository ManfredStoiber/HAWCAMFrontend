import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// imports of other modules this module depends on
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// declarations of components to module
import { AppComponent } from './app.component';
import { StartButtonsComponent } from './start-buttons/start-buttons.component';
import { HeaderComponent } from './header/header.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// declaration of services to module
import { RESTService } from './rest.service';

@NgModule({
  declarations: [
    AppComponent,
    StartButtonsComponent,
    HeaderComponent,
    ListCategoriesComponent,
    PageNotFoundComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RESTService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
