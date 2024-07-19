
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from 'rxjs';
import {LignePanier} from "../models/ligne-panier";
import {Article} from "../models/article";
import {Produit} from "../models/produit";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class PanierService {

  private panierSubject$: BehaviorSubject<LignePanier[]> = new BehaviorSubject<LignePanier[]>([]);
  public panier$: Observable<LignePanier[]> = this.panierSubject$.asObservable();


  items:  Produit[] = [];

  constructor(private route: Router) {
  }

  get panier(): LignePanier[] {
    return this.panierSubject$.getValue();
  }

  add(article: Article) {
    let panier = this.panier;

    // Vérifier si l'article n'existe pas déjà dans le panier :
    // - s'il existe : on augmente simplement sa quantité
    let dejaDansPanier = false;
    for (let ligne of panier) {
      if (ligne.article.id === article.id) {
          ligne.quantite++;
          dejaDansPanier = true;
      }
    }

    // - s'il n'existe pas : on crée une nouvelle ligne dans le panier
    if (!dejaDansPanier) {
      const ligne = {
        article: article,
        quantite: 1
      }
      panier.push(ligne);
    }

    this.panierSubject$.next( panier );
    this.savePanier();
  }

  removeLigne(articleId: number) {
    const panier = this.panier;
    let i = 0;

    for (let ligne of panier) {
      if (ligne.article.id === articleId) {
        const confirmation = confirm('Souhaitez-vous supprimer cet article de votre panier ?');
        if (confirmation == true)
        panier.splice(i, 1);
        break;
      }
      i++;
    }

    this.panierSubject$.next( panier );
    this.savePanier();

  }

  remove(articleId: number) {
    const panier = this.panier;
    let i = 0;

    for (let ligne of panier) {

      if (ligne.article.id === articleId) {
        if (ligne.quantite > 1) {
          ligne.quantite--;
        }
        else {
        const confirmation = confirm('Souhaitez-vous supprimer cet article de votre panier?');
          if (confirmation == true)
          panier.splice(i, 1);
          else
            ;
        }
        break;
      }
      i++;
    }
    this.panierSubject$.next( panier );
    this.savePanier();
  }

  clear() {
    this.panierSubject$.next([]);
    this.savePanier();
    this.route.navigate(['/home']);
  }

  clearR() {
    this.panierSubject$.next([]);
    this.savePanier();
  }

  savePanier() {
    sessionStorage.setItem('panier', JSON.stringify(this.panier));
  }

  loadPanier() {
    const panierJson: string | null = sessionStorage.getItem('panier');
    if (panierJson) {
      const panier = JSON.parse(panierJson);
      this.panierSubject$.next(panier);
    }
  }

  clearCart() {
    this.items = [];
    this.savePanier();
    return this.items;
  }

  getItems() {

  }
}
