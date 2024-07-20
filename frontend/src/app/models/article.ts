import { Tva } from './tva';

export interface Article  {
  article_id: number;                  
  article_intitule: string;            
  article_code_barre: string;       
  article_prix: number;  
  article_tva: number;  
  article_url: string;              
  article_marque: number;              
  article_categorie: number;          
  article_description: string;         
  article_poids?: string;              
  article_longeur?: string;            
  article_largeur?: string;            
  article_hauteur?: string;            
  article_actif: boolean;             
  article_fournisseur_id: number;     
  tva?: Tva;                           
  prixTVAC?: number;                   
}
