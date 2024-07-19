import { Injectable } from '@nestjs/common';
import { ErrorMessages } from 'src/shared/error-management/errors-message';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HistoriqueService {
  constructor(private readonly prismaService: PrismaService) {}

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Historique @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async getAllHistoriques() {
    try {
      const historiques = await this.prismaService.historiques.findMany({
        orderBy: {
          publicationDate: 'desc', // Ajout du tri par date de publication, du plus récent au plus ancien
        },
      });

      // Ici on vérifie si la liste des historiques est vide
      if (historiques.length === 0) {
        return {
          message: ErrorMessages.NO_HISTORIQUES,
        };
      }

      // On retourne la liste complète des historiques
      return {
        result: true,
        count: historiques.length, // Ajoutez count ici, au même niveau que 'data'
        data: historiques, // Directement le tableau des historiques
        error_code: null,
        error: null,
      };
    } catch (error) {
      // Relance l'erreur pour qu'elle soit gérée ailleurs
      throw error;
    }
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Chercher un historique par un mot clé @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async searchAllHistoriquesByKeyword(keyword: string) {
    try {
      const historiques = await this.prismaService.historiques.findMany({
        where: {
          OR: [
            { histNumber: { contains: keyword } },
            { nameCompany: { contains: keyword } },
            { nameRecruiter: { contains: keyword } },
            { firstnameRecruiter: { contains: keyword } },
            { jobtitle: { contains: keyword } },
            { contractTypetitle: { contains: keyword } },
            { JobLocation: { contains: keyword } },
            { checkUserConsultant: { contains: keyword } },
            { tvaNumber: { contains: keyword } },
            { addressCompany: { contains: keyword } },
            { email: { contains: keyword } },
            { phoneNumber: { contains: keyword } },
          ],
        },
        orderBy: {
          jobCloseDate: 'desc', // Ajout du tri par date de publication, du plus récent au plus ancien
        },
      });

      // Ici on vérifie si la liste des historiques est vide
      if (historiques.length === 0) {
        return {
          message: ErrorMessages.NO_HISTORIQUES_BY_KEYWORD,
        };
      }

      // On retourne la liste complète des historiques
      return {
        result: true,
        count: historiques.length, // Ajoutez count ici, au même niveau que 'data'
        data: historiques, // Directement le tableau des historiques
        error_code: null,
        error: null,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Recherche par plage de dates @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async searchHistoriquesByDateRange(startDate: Date, endDate: Date) {
    try {
   

    const formattedStartDate = new Date(startDate);
    formattedStartDate.setUTCHours(0, 0, 0, 0);

    const formattedEndDate = new Date(endDate);
    formattedEndDate.setUTCHours(23, 59, 59, 999);

      // Requête Prisma pour obtenir les historiques
      const historiques = await this.prismaService.historiques.findMany({
        where: {
          jobCloseDate: {
            gte: formattedStartDate,
            lte: formattedEndDate,
          },
        },
        orderBy: {
          jobCloseDate: 'desc',
        },
      });
  
      // Affichage des historiques trouvés
      console.log('Historiques Found:', historiques);
  
      // Vérification si la liste est vide
      if (historiques.length === 0) {
        return { message: ErrorMessages.NO_HISTORIQUES_BY_KEYWORD };
      }
  
      // Retour des historiques trouvés
      return {
        result: true,
        count: historiques.length,
        data: historiques,
        error_code: null,
        error: null,
      };
    } catch (error) {
      // Affichage de l'erreur
      console.error('Error in searchHistoriquesByDateRange:', error);
      throw error;
    }
  }
  
}