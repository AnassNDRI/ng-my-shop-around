import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Livraison} from '../../../models/livraison';
import {LivraisonService} from '../../../services/livraison.service';
import {LivraisonStatut} from '../../../models/livraison-statut';
import {Adresse} from '../../../models/adresse';

import {LivraisonStatutService} from '../../../services/livraison-statut.service';
import {AdresseService} from "../../../services/adresse.service";


@Component({
  selector: 'app-livraison-list',
  templateUrl: './livraison-list.component.html',
  styleUrls: ['./livraison-list.component.css']
})
export class LivraisonListComponent implements OnInit {

  livraisons: Livraison[] = [];
  livraisonStatutList: LivraisonStatut[] = [];
  adresseList: Adresse[] = [];

  constructor(
    private livraisonService: LivraisonService,
    private adresseService: AdresseService,
    private livraisonStatutService: LivraisonStatutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adresseService.list().subscribe( result => this.adresseList = result );
    this.livraisonStatutService.list().subscribe( result => this.livraisonStatutList = result );
    this.refresh();
  }

  refresh() {
    this.livraisonService.list().subscribe( livraisons => {
      this.livraisons = livraisons;
      console.log(this.livraisons);
    });
  }

  getLabelStatutLivraison(statutLivraisonId: number) {
    const statutLivraison = this.livraisonStatutList.find( statutLivraison => statutLivraison.id === statutLivraisonId);
    if( statutLivraison ) {
      return statutLivraison.libelle;
    }
    return 'Pas de statut de livraison';
  }

  getLabelAdresse(adresseId: number) {
    const adresse = this.adresseList.find( adresse => adresse.id === adresseId);
    if( adresse ) {
      return adresse.rue +  ' ' +  adresse.numero +  ' ' +  adresse.codePostal +  ' ' + adresse.ville;
    }
    return 'Pas d\'adresse';
  }


  askEdit(id: number) {
    this.router.navigate(['/livraisons', 'form', id]);
  }

  askDelete(id: number) {
    this.livraisonService.delete(id).subscribe( () => {
      alert('Livraison supprimée');
      this.refresh();
    });

  }

  askAdd() {
    this.router.navigate(['/livraisons', 'form']);
  }

  askBack() {
    this.router.navigate(['/admin']);
  }

}
