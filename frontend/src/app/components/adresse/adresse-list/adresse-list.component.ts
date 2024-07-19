import {Component, Input, OnInit} from '@angular/core';
import {Adresse} from "../../../models/adresse";
import {AuthenticationService} from '../../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdresseService} from '../../../services/adresse.service';
import {AdresseType} from "../../../models/adresse-type";
import { FormGroup} from '@angular/forms';
import {AdresseTypeService} from "../../../services/adresse-type.service";




@Component({
  selector: 'app-adresse-list',
  templateUrl: './adresse-list.component.html',
  styleUrls: ['./adresse-list.component.css']
})
export class AdresseListComponent implements OnInit {

  adresse!: Adresse;
  adresseList: Adresse[] = [];
  formGroup!: FormGroup;
  currentUserId!: number| null;
  adresseTypeList: AdresseType[] = [];

  adresseSelected: Adresse | null = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adresseService: AdresseService,
              private authService: AuthenticationService,
              private adresseTypeService: AdresseTypeService) {
    this.currentUserId = this.authService.userId;
  }

  ngOnInit(): void {
    this.refresh();
  }

  askBack() {
    this.router.navigate(['/profile'])
  }

  getAdresseType(adresseTypeId: number) {
    return this.adresseTypeList.find( type => type.id === adresseTypeId )
  }


  refresh() {
    this.adresseSelected = null;
    this.adresseService.findByUtilisateur().subscribe(adresses => this.adresseList = adresses);
    this.adresseTypeService.list().subscribe( list => this.adresseTypeList = list );
  }

  askAddAddress() {
    this.adresseSelected = {
      id: (null as any),
      utilisateurId: this.currentUserId!,
      rue: '',
      numero: '',
      boite: '',
      codePostal: '',
      ville: '',
      pays: '',
      adresseTypeId: (null as any)
    };
  }

  askDelete(event: MouseEvent, id: number) {
    if (event) {
      event.stopPropagation();
    }
    this.adresseService.delete(id).subscribe(res => {
      this.refresh();
    });
  }

}

