import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartButtonsComponent } from './start-buttons/start-buttons.component';


const routes: Routes = [

  {path: '', component: StartButtonsComponent},
  {path: '**', component: StartButtonsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
