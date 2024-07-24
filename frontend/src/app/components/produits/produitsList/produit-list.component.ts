import { Component, Input, OnInit } from '@angular/core';
import { Article } from "../../../models/article";
import { Category } from "../../../models/category";
import { ArticleService } from "../../../services/article.service";
import { PanierService } from "../../../services/panier.service";
import { CategorieService } from "../../../services/categorie.service";

import { TvaService } from "../../../services/tva.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css']
})
export class ProduitListComponent implements OnInit {

  @Input() titre = '';
  @Input() editionMode = true;

  articles: Article[] = [];
  categoryList: Category[] = [];
  categoryIdSelected: number | null = null;
  filtre = '';

  constructor(
    private articleService: ArticleService,
    private panierService: PanierService,
    private categoryService: CategorieService,
    private tvaService: TvaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.list().subscribe(result => this.categoryList = result);
    this.refresh();
  }

  refresh() {
    this.articleService.list().subscribe(articles => {
      this.tvaService.list().subscribe(tvaList => {
        for (let article of articles) {
          const tva = tvaList.find(tva => tva.tva_id === article.tva?.tva_id);
          if (tva) {
            article.tva = tva;
            article.prixTVAC = article.article_prix * (1 + article.tva.tva_pct);
          }
        }
        this.articles = articles;
      });
    });
  }

  filtrerArticles(articles: Article[]) {
    return articles.filter(art => {
      return (art.article_categorie === this.categoryIdSelected || this.categoryIdSelected === null) &&
        art.article_intitule.toUpperCase().includes(this.filtre.trim().toUpperCase());
    });
  }

  getLabelCategorie(categorieId: number) {
    const cat = this.categoryList.find(cat => cat.categorie_id === categorieId);
    if (cat) {
      return cat.categorie_libelle;
    }
    return 'Pas de catégorie';
  }

  askDetail(id: number) {
    this.router.navigate(['/articles', 'detail', id]);
  }

  askDelete(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.articleService.delete(id).subscribe(() => {
      alert('Article supprimé');
      this.refresh();
    });
  }

  askBack() {
    this.router.navigate(['/admin']);
  }

  askAddToCart(article: Article, event: MouseEvent) {
    event.stopPropagation();
    this.panierService.add(article);
  }

  askEdit(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/articles', 'form', id]);
  }

  askAdd() {
    this.router.navigate(['/articles', 'form']);
  }


}
