import {Tva} from './tva';

export interface Article  {

  id: number;
  intitule: string;
  codeBarre: string;
  prix: number;
  tvaId: number;
  marqueId: number;
  categorieId: number;
  description: string;
  url: string;
  actif: boolean;
  fournisseurId: number;
  tva: Tva;
  prixTVAC: number;

}
