import { Component, OnInit } from '@angular/core';
import {LignePanier} from "../../../models/ligne-panier";
import {Utilisateur} from "../../../models/utilisateur";
import {Adresse} from "../../../models/adresse";
import {Tva} from "../../../models/tva";
import {Subscription} from "rxjs";
import {PanierService} from "../../../services/panier.service";
import {TvaService} from "../../../services/tva.service";
import {AdresseService} from "../../../services/adresse.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  numCommande:any;
  panier!: LignePanier[];
  curDate = new Date();
  shippingDate = new Date(); 
  total:number=0.00;
  frais:number=0.00;
  soustotal:number = 0.00;
  currentUser!:Utilisateur;
  adresse!: Adresse;
  adresseList: Adresse[] = [];
  tvaList: Tva[]= [];
  panierSubscription!: Subscription;
  prixTotal:number=0
  adresseSelected: Adresse | null = null;


  constructor(private profileService: ProfileService,
              private adresseService: AdresseService,
              private panierService:PanierService,
              private tvaService:TvaService,
              private route: Router) {

  }

  ngOnInit(): void {
   // this.adresseSelected?.rue;
    this.panier = this.panierService.panier;
  //  this.tvaService.list().subscribe( result => this.tvaList = result);
    this.listenPanier();
    this.numCommande = this.generateNumCommande();
    this.addDaysToShippingDate(3); 
  //  this.adresseService.findByUtilisateur().subscribe(adresses => this.adresseList = adresses);
  //  this.profileService.getAccount().subscribe(utilisateur => this.currentUser = utilisateur);
  //  this.numCommande = this.generateNumCommande();
  }

  // Normalement on l'obtient de la base donnée dans de la table commande
  private generateNumCommande() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const randomPart = Math.random().toString().slice(2, 8); // 6-digit random number
  
    return `${day}${month}${year}-${randomPart}`;
  }
 
  // Normalement on l'obtient de la base donnée dans Livraison
  private addDaysToShippingDate(days: number) {
    this.shippingDate.setDate(this.shippingDate.getDate() + days);
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

  change(event: any){
    this.adresseList=event;
  }

  clearCart(){
    this.route.navigate(['/home']);
      this.panierService.clear();
  }
}
