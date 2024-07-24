import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitDetailComponent } from './produitDetail/produit-detail.component';
import { ProduitListComponent } from './produitsList/produit-list.component';
import { ProduitRoutingModule } from './produit.routing.module';

@NgModule({
  declarations: [
    ProduitDetailComponent,
    ProduitListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProduitRoutingModule
  ],
  exports: [
    ProduitDetailComponent,
    ProduitListComponent
  ]
})
export class ProduitsModule { }
