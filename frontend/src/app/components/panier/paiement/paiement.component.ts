import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanierService} from "../../../services/panier.service";
import {LignePanier} from "../../../models/ligne-panier";


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  panier!: LignePanier[];

  constructor(private route:Router, private panierService : PanierService ) { }

  ngOnInit(): void {
    this.panier = this.panierService.panier;
  }



  RetourConfirPanier() {
    this.route.navigate(['/panier/confirmerPanier']);

  }
}
