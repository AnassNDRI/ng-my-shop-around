import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  All Products @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async getAllTimeProducts() {
    // Récupération de toutes les fonctions
    const articles = await this.prismaService.articles.findMany({});
    // Ici on vérifie si la liste  est vide
    if (articles.length === 0) {
      return { message: 'Aucun article dans la Base de donnèes' };
    }
    // On retourne la liste complète

    return {
      result: true,
      data: articles,
      count: articles.length,
      error_code: null,
      error: null,
    };
  }

  getAllTimsProducts() {
    return [
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' },
    ];
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ product Detail   @@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async productDetail(article_id: number) {
    try {
      // On vérifie si l'offre d'emploi existe
      const checkProduct = await this.verifyProductExistence(article_id);
      // Récupérer et retourner les détails de l'offre d'emploi
      const product = await this.prismaService.articles.findUnique({
        where: { article_id: checkProduct.article_id },
      });
      // On retourne la liste complète des fonctions
      return {
        result: true,
        data: product,
        error_code: null,
        error: null,
      };
    } catch (error) {
      // Relance l'erreur pour qu'elle soit gérée ailleurs
      throw error;
    }
  }

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  chercher un emploi par le nom d'une localité  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async getBycategoryId(article_categoryId: number) {
    try {
      const category = await this.verifyCategoryExistence(article_categoryId);

      const products = await this.prismaService.articles.findMany({
        where: {
          article_categorie: category.categorie_id,
        },
      });

      if (products.length === 0) {
        return { message: 'Aucun produit correspondant trouvé' };
      }

      // On retourne la liste complète des fonctions
      return {
        result: true,
        count: products.length, // Ajoutez count ici, au même niveau que 'data'
        data: products, // Directement le tableau des jobListings
        error_code: null,
        error: null,
      };
    } catch (error) {
      // Relance l'erreur pour qu'elle soit gérée ailleurs
      throw error;
    }
  }

  /////////////////// Fonction pour vérifier l'existance du Product
  async verifyProductExistence(article_id: number) {
    const article = await this.prismaService.articles.findUnique({
      where: { article_id },
    });
    if (!article) {
      throw new NotFoundException(
        "Ce produit n'existe plus ou est rupture de stocks",
      );
    }
    return article;
  }

  /////////////////// On vérifie si la categorie spécifiée existe
  async verifyCategoryExistence(categorie_id: number) {
    const category = await this.prismaService.categories.findUnique({
      where: { categorie_id: categorie_id },
    });
    if (!category)
      throw new NotFoundException("La categorie spécifiée n'existe pas.");
    return category;
  }
}
