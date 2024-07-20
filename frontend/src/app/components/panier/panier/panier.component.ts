import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../../../models/article';
import {LignePanier} from '../../../models/ligne-panier';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {TvaService} from '../../../services/tva.service';
import {Tva} from '../../../models/tva';
import {PanierService} from "../../../services/panier.service";

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {

    panier!: LignePanier[];
    prixTotal: number = 0;
    panierSubscription!: Subscription;
    tvaList: Tva[]= [];


  constructor(private router: Router,
              private tvaService: TvaService,
              private panierService: PanierService) { }

  ngOnInit(): void {
    this.panier = this.panierService.panier;
    this.tvaService.list().subscribe( result => this.tvaList = result);
    this.listenPanier();
  }

  ngOnDestroy() {
    this.panierSubscription.unsubscribe();
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

  askDelete(id: number) {
    this.panierService.removeLigne(id);
  }

  removeArticle(article: Article) {
    this.panierService.remove(article.article_id);
  }

  addArticle(article: Article) {
   // const confirmation = confirm('Desolé nous somme en rupture de stock pour ce article ?');
    this.panierService.add(article);
  }

  askBack() {
    this.router.navigate(['/home'])
  }

  askOrder() {
    this.router.navigate(['/panier/verifierPanier'])
  }

  clearCart(){
    const confirmation = confirm('Souhaitez-vous vraiment VIDER votre panier ?');
    if (confirmation == true)
    this.panierService.clear();
  }
}
