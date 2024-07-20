import { Component, OnInit } from '@angular/core';
import {LignePanier} from "../../../models/ligne-panier";
import {Subscription} from "rxjs";
import {Adresse} from "../../../models/adresse";
import {Utilisateur} from "../../../models/utilisateur";
import {MoyenPaiement} from "../../../models/moyen-paiement";
import {PanierService} from "../../../services/panier.service";
import {MoyenPaiementService} from "../../../services/moyen-paiement.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

import {AdresseService} from "../../../services/adresse.service";

@Component({
  selector: 'app-verifier-panier',
  templateUrl: './verifier-panier.component.html',
  styleUrls: ['./verifier-panier.component.css']
})
export class VerifierPanierComponent implements OnInit {
  prixTotal: number = 0;
  panier!: LignePanier[];
  panierSubscription!: Subscription;
  adresse!: Adresse;
  utilisateur!:Utilisateur;
  isAuth = false;
  myToken:any;
  adresseList: Adresse[] = [];
  moyenPtList: MoyenPaiement[] = [];

  constructor(private panierService:PanierService,
              private adresseService: AdresseService,
              private moyenPaiementService: MoyenPaiementService,
              private route:Router ,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    console.log('isAuth before : ' , this.isAuth);
    this.myToken = sessionStorage.getItem('my-token');
    if(this.myToken){
      this.isAuth = true;
      this.authService.isAuthenticated.next(true);

    }else{
      this.isAuth=false;
      this.authService.isAuthenticated.next(false);
      alert('Veuillez-vous connecter pour valider votre commande');
      this.route.navigate(['/login']);
    }

    this.authService.isAuthenticated.subscribe( auth => {
      this.isAuth = auth;
    });
    this.adresseService.findByUtilisateur().subscribe( result => this.adresseList = result );
    this.moyenPaiementService.list().subscribe( result => this.moyenPtList = result );
    this.panier = this.panierService.panier;
    this.listenPanier();
  }

  listenPanier() {
    this.panierSubscription = this.panierService.panier$.subscribe( panier => {
      this.panier = panier;
      this.calculerTotal();
    });
  }

  calculerTotal() {
    this.prixTotal = 0;
    for( let ligne of this.panier ) {
      this.prixTotal += ligne.article.article_prix * ligne.quantite;
    }
  }


  onCheckout() {
    this.route.navigate(['/panier/paiementPanier']);
  }

  askSave() {
   // alert('Module ne faisant pas partie des modules à développer');
    this.onCheckout();
  }



}
