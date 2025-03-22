import { Component, Input, OnInit } from '@angular/core';
import { Article } from "../../../models/article";
import { Category } from "../../../models/category";
import { ArticleService } from "../../../services/article.service";
import { PanierService } from "../../../services/panier.service";
import { CategorieService } from "../../../services/categorie.service";
import { TvaService } from "../../../services/tva.service";
import { Router } from '@angular/router';
import { forkJoin, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css']
})
export class ProduitListComponent implements OnInit {

  @Input() titre = ''; // Titre de la page, passé comme une entrée
  @Input() editionMode = true; // Mode édition, passé comme une entrée

  articles: Article[] = []; // Liste des articles
  categoryList: Category[] = []; // Liste des catégories
  categoryIdSelected: number | null = null; // Catégorie sélectionnée
  filtre = ''; // Filtre pour la recherche
  isLoading: boolean = true; // Indicateur de chargement

  constructor(
    private articleService: ArticleService, // Service pour les articles
    private panierService: PanierService, // Service pour le panier
    private categoryService: CategorieService, // Service pour les catégories
    private tvaService: TvaService, // Service pour la TVA
    private router: Router // Service de routage
  ) { }

  ngOnInit(): void {
    this.loadData(); // Charger les données au démarrage du composant
  }

  loadData() {
    // Charger les catégories et les articles en parallèle
    forkJoin({
      categories: this.categoryService.list(), // Requête pour les catégories
      articles: this.articleService.list() // Requête pour les articles
    }).pipe(
      // Une fois les catégories et les articles chargés, charger les taux de TVA
      switchMap(results => {
        this.categoryList = results.categories; // Assigner les catégories
        return this.tvaService.list().pipe(
          // Pour chaque article, trouver et assigner le taux de TVA correspondant
          map(tvaList => {
            results.articles.forEach(article => {
              const tva = tvaList.find(tva => tva.tva_id === article.tva?.tva_id);
              if (tva) {
                article.tva = tva;
                article.prixTVAC = article.article_prix * (1 + article.tva.tva_pct); // Calculer le prix TTC
              }
            });
            return results.articles; // Retourner les articles mis à jour
          })
        );
      })
    ).subscribe(articles => {
      this.articles = articles; // Assigner les articles à la propriété articles
      this.isLoading = false; // Indiquer que le chargement est terminé
    });
  }

  // Filtrer les articles en fonction de la catégorie sélectionnée et du filtre de recherche
  filtrerArticles(articles: Article[]) {
    return articles.filter(art => {
      return (art.article_categorie === this.categoryIdSelected || this.categoryIdSelected === null) &&
        art.article_intitule.toUpperCase().includes(this.filtre.trim().toUpperCase());
    });
  }

  // Obtenir le libellé de la catégorie en fonction de l'ID de la catégorie
  getLabelCategorie(categorieId: number) {
    const cat = this.categoryList.find(cat => cat.categorie_id === categorieId);
    if (cat) {
      return cat.categorie_libelle;
    }
    return 'Pas de catégorie';
  }

  // Naviguer vers la page de détail de l'article
  askDetail(id: number) {
    this.router.navigate(['/articles', 'detail', id]);
  }

  // Supprimer un article
  askDelete(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.articleService.delete(id).subscribe(() => {
      alert('Article supprimé');
      this.loadData(); // Recharger les données après la suppression
    });
  }

  // Retourner à la page d'administration
  askBack() {
    this.router.navigate(['/admin']);
  }

  // Ajouter un article au panier
  askAddToCart(article: Article, event: MouseEvent) {
    event.stopPropagation();
    this.panierService.add(article);
  }

  // Éditer un article
  askEdit(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/articles', 'form', id]);
  }

  // Ajouter un nouvel article
  askAdd() {
    this.router.navigate(['/articles', 'form']);
  }

}
