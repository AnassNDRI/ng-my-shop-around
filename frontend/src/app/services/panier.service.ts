import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LignePanier } from '../models/ligne-panier';
import { Article } from '../models/article';
import { Produit } from '../models/produit';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private panierSubject$: BehaviorSubject<LignePanier[]> = new BehaviorSubject<
    LignePanier[]
  >([]);
  public panier$: Observable<LignePanier[]> =
    this.panierSubject$.asObservable();

  private validateSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public validate$: Observable<boolean> = this.validateSubject$.asObservable();

  items: Produit[] = [];

  constructor(private route: Router) {}

  get panier(): LignePanier[] {
    return this.panierSubject$.getValue();
  }

  add(article: Article) {
    let panier = this.panier;

    // Logique d'ajout...
    console.log('Avant ajout :', panier);

    let dejaDansPanier = false;
    for (let ligne of panier) {
      if (ligne.article.article_id === article.article_id) {
        ligne.quantite++;
        dejaDansPanier = true;
      }
    }

    if (!dejaDansPanier) {
      panier.push({ article, quantite: 1 });
    }

    console.log('Après ajout :', panier);
    this.panierSubject$.next(panier); // Émettre la nouvelle valeur
    this.savePanier();
  }

  removeLigne(articleId: number) {
    const panier = this.panier;
    let i = 0;

    for (let ligne of panier) {
      if (ligne.article.article_id === articleId) {
        const confirmation = confirm(
          'Souhaitez-vous supprimer cet article de votre panier ?'
        );
        if (confirmation == true) panier.splice(i, 1);
        break;
      }
      i++;
    }

    this.panierSubject$.next(panier);
    this.savePanier();
  }

  remove(articleId: number) {
    const panier = this.panier;
    let i = 0;

    for (let ligne of panier) {
      if (ligne.article.article_id === articleId) {
        if (ligne.quantite > 1) {
          ligne.quantite--;
        } else {
          const confirmation = confirm(
            'Souhaitez-vous supprimer cet article de votre panier?'
          );
          if (confirmation == true) panier.splice(i, 1);
          else;
        }
        break;
      }
      i++;
    }
    this.panierSubject$.next(panier);
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

  setValidate(validate: boolean) {
    this.validateSubject$.next(validate);
  }
}
