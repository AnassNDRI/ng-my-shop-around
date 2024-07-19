import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProduitDetailComponent} from "./produitDetail/produit-detail.component";
import {ProduitListComponent} from "./produitsList/produit-list.component";
import {ProduitSharedModule} from "./produit-shared.module";
import {ProduitRoutingModule} from "./produit.routing.module";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProduitDetailComponent,


  ],
  imports: [
    CommonModule,
    ProduitSharedModule,
    ProduitRoutingModule,
    FormsModule
  ],
  exports: [ProduitListComponent]



})
export class ProduitsModule { }
