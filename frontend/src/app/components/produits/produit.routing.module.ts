import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../../helpers/auth.guard';
import {ProduitDetailComponent} from "./produitDetail/produit-detail.component";
import {ProduitListComponent} from "./produitsList/produit-list.component";

const routes: Routes = [
  {
    path: '', children: [
      { path: 'detail/:id', component: ProduitDetailComponent },
      { path: 'list', component: ProduitListComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
