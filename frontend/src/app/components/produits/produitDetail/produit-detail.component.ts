import { Component, OnInit } from '@angular/core';
import {Article} from "../../../models/article";
import {Category} from "../../../models/category";
import {Tva} from "../../../models/tva";
import {ActivatedRoute, Router} from "@angular/router";
import {CategorieService} from "../../../services/categorie.service";
import {PanierService} from "../../../services/panier.service";
import {TvaService} from "../../../services/tva.service";
import {ArticleService} from "../../../services/article.service";

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {

  prod!: Article;
  prodId: number;
  categoryList: Category[] = [];
  tvaList: Tva[] = [];

  constructor( private route: ActivatedRoute,
               private router: Router,
               private categorieService: CategorieService,
               private panierService: PanierService,
               private tvaService: TvaService,
               private articleService: ArticleService) {
    this.prodId = this.route.snapshot.params['id']; }

  ngOnInit(): void {
    this.categorieService.list().subscribe( result => this.categoryList = result );
    this.refreshProd();
  }

  refreshProd() {
    this.tvaService.list().subscribe( listTva => {
      this.tvaList = listTva;

      this.articleService.findById(this.prodId).subscribe( prod => {
        this.prod = prod;

        const tva = this.tvaList.find( tva => tva.tva_id === this.prod.tva?.tva_id );
        if(tva) {
          this.prod.tva = tva;
          this.prod.prixTVAC = this.prod.article_prix * ( 1 + tva.tva_pct );
        }


      } );

    } );
  }

  getLabelCategorie(categorieId: number) {
    const cat = this.categoryList.find( cat => cat.categorie_id === categorieId);
    if( cat ) {
      return cat.categorie_libelle;
    }
    return 'Pas de catégorie';
  }


  askBack() {
    this.router.navigate(['/articles'])
  }

  askAddToCart(article: Article) {
    this.panierService.add(article);
  }

  getTVA(TVAId: number) {
    const tva = this.tvaList.find( tva => tva.tva_id === TVAId);
    if( tva ) {
      return tva.tva_libelle;
    }
    return 'Pas de catégorie';
  }
}
