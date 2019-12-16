import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartButtonsComponent } from './start-buttons/start-buttons.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  { path: '', redirectTo: "/start", pathMatch: "full" },
  { path: 'start', component: StartButtonsComponent },
  { path: 'listCategories', component: ListCategoriesComponent },
  { path: 'pageNotFound', component: PageNotFoundComponent },
  // wenn nichts greift -> Startseite
  { path: '**', redirectTo: "/pageNotFound", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
