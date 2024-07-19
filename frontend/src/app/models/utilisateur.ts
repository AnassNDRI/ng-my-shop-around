import {Adresse} from './adresse';

export interface Utilisateur   {
  id: number,
  nom: string;
  prenom: string;
  email: string;
  mdp: string;
  dateNaissance: Date;
  roleId : number;
  telephone: string;
  gsm: string;
  actif: boolean;

}
