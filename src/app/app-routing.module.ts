import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartButtonsComponent } from './start-buttons/start-buttons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ShowCategoryComponent } from './show-category/show-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { CreateObjectComponent } from './create-object/create-object.component';
import { ShowObjectComponent } from './show-object/show-object.component';
import { EditObjectComponent } from './edit-object/edit-object.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: "/start", pathMatch: "full" },
  { path: 'start', component: StartButtonsComponent },
  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: 'createCategory', component: CreateCategoryComponent},
  { path: 'listCategories', component: ListCategoriesComponent },
  { path: 'showCategory', component: ShowCategoryComponent },
  { path: 'editCategory', component: EditCategoryComponent },
  { path: 'chooseCategory', component: ChooseCategoryComponent },
  { path: 'showObject', component: ShowObjectComponent },
  { path: 'editObject', component: EditObjectComponent },
  { path: 'createObject', component: CreateObjectComponent},
  { path: 'search', component: SearchComponent},
  // wenn nichts greift -> Startseite
  { path: '**', redirectTo: "/pageNotFound", pathMatch: "full" }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
