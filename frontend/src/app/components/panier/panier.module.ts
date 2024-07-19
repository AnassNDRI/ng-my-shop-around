import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier/panier.component';
import {PanierRoutingModule} from './panier-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LivraisonModule} from "../livraison/livraison.module";
import {VerifierPanierComponent} from "./verifierPanier/verifier-panier.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {AdresseModule} from "../adresse/adresse.module";
import { PaiementComponent } from './paiement/paiement.component';




@NgModule({
  declarations: [
    PanierComponent,
    VerifierPanierComponent,
    ConfirmationComponent,
    PaiementComponent


  ],
  exports: [],

  imports: [
    CommonModule,
    PanierRoutingModule,
    FormsModule,
    AdresseModule,
    LivraisonModule,

    ReactiveFormsModule
  ]
})
export class PanierModule { }
