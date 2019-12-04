import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { StartButtonsComponent } from './start-buttons/start-buttons.component';


const routes: Routes = [
  {path: 'createCategory', component: CreateCategoryComponent},
  {path: '', component: StartButtonsComponent},
  {path: '**', component: StartButtonsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
