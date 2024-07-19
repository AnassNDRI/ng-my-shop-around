import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Adresse} from "../../../models/adresse";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdresseService} from "../../../services/adresse.service";
import {AdresseType} from '../../../models/adresse-type';
import {Router} from "@angular/router";
import {AdresseTypeService} from "../../../services/adresse-type.service";
import {Utilisateur} from "../../../models/utilisateur";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-adresse-form',
  templateUrl: './adresse-form.component.html',
  styleUrls: ['./adresse-form.component.css']
})
export class AdresseFormComponent implements OnInit {

  @Input() adresse!: Adresse;
  @Input() adresseTypeList: AdresseType[] = [];

  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  formGroup!: FormGroup;
  utilisateur!: Utilisateur;

  constructor(
    private formBuilder: FormBuilder,
    private adresseService: AdresseService,
    private adresseTypeService: AdresseTypeService,
    private authentificationService: AuthenticationService,
    router : Router) {
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      id: [null],
      utilisateurId: [],
      rue: [''],
      numero: [''],
      boite: [''],
      codePostal: [''],
      ville: [''],
      pays: [''],
      adresseTypeId: [null],
    });

    this.refreshFormGroupAdresse();
    this.adresseTypeService.list().subscribe( result => this.adresseTypeList = result );

  }

  refreshFormGroupAdresse() {
    this.formGroup.patchValue(this.adresse);
  }

  askSave() {
    this.authentificationService.isAuthenticated.next(true);
    this.adresse = this.formGroup.getRawValue();
    this.adresseService.save(this.adresse).subscribe(adresse => {
      this.askBack();
    })
  }


  askBack() {
    this.back.emit();
  }

}

