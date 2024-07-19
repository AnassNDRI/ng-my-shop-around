import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PanierComponent} from './panier/panier.component';
import {VerifierPanierComponent} from "./verifierPanier/verifier-panier.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {AdresseFormComponent} from "../adresse/adresse-form/adresse-form.component";
import {PaiementComponent} from "./paiement/paiement.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path :'',component:PanierComponent},
      { path: 'verifierPanier', component: VerifierPanierComponent},
      { path: 'confirmerPanier', component: ConfirmationComponent},
      { path: 'paiementPanier', component: PaiementComponent},
      { path: 'form', component: AdresseFormComponent}]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanierRoutingModule { }
