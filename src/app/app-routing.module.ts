import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartButtonsComponent } from './start-buttons/start-buttons.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  { path: 'start', component: StartButtonsComponent },
  { path: 'listCategories', component: ListCategoriesComponent },
  { path: 'notFound', component: NotFoundComponent },
  // wenn nichts greift -> Startseite
  { path: '', redirectTo: "/start", pathMatch: "full" },
  { path: '**', redirectTo: "/notFound", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
