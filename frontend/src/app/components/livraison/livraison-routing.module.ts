import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LivraisonListComponent} from './livraison-list/livraison-list.component';


const routes: Routes = [
  {
    path: '', children: [
      { path: 'list', component: LivraisonListComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRoutingModule { }
