export interface Facture {
  id: number;
  commandeId: number;
  statutId: number;
  adresseId: number;
  dateCreation: Date;
  datePaiement: Date;
  dateMaj: Date;
  moyenPaiementId: number;
}
