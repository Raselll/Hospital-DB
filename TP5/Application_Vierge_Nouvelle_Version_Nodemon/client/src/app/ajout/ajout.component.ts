import { Component, OnInit } from "@angular/core";
import { Medecins } from "../member.interface";
import { CommunicationService } from "../services/communication.service";

@Component({
  selector: "app-ajout",
  templateUrl: "./ajout.component.html",
  styleUrls: ["./ajout.component.css"],
})
export class AjoutComponent implements OnInit {
  constructor(private communicationService: CommunicationService) {}
  medecin: Medecins = {
    idMedecin: '123',
    prenom: 'John',
    nom: 'Doe',
    specialite: 'Dermatologie',
    anneesExperience: '0',
    idService: '456',
  };

  medecinsAjoutes: Medecins[] = [];
  prenomInvalide: boolean = false;
  nomInvalide: boolean = false;
  idMedecinInvalide: boolean = false;
  idServiceInvalide: boolean = false;

  formValide() {
    return this.medecin.idMedecin && this.medecin.prenom && this.medecin.nom && this.medecin.specialite && this.medecin.anneesExperience && this.medecin.idService;
  }

  validerNombre(event: KeyboardEvent, champ: string): void {
    const caractereValide = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    const estValide = caractereValide.test(inputChar);

    if (champ === 'idMedecin') {
      this.idMedecinInvalide = !estValide;
    } else if (champ === 'idService') {
      this.idServiceInvalide = !estValide;
    }

    if (!estValide) {
      event.preventDefault();
    }
  }

  validerLettres(event: KeyboardEvent, champ: string): void {
    const pattern = /[a-zA-Z]/;
    const inputChar = String.fromCharCode(event.charCode);
    const estValide = pattern.test(inputChar);

    if (champ === 'prenom') {
      this.prenomInvalide = !estValide;
    } else if (champ === 'nom') {
      this.nomInvalide = !estValide;
    }

    if (!estValide) {
      event.preventDefault();
    }
  }

  ajouterMedecin(): void {
    const anneesExperience = Number(this.medecin.anneesExperience);
    const idMedecin = Number(this.medecin.idMedecin);
    const idService = Number(this.medecin.idService);

    if (
      anneesExperience < 0 ||
      anneesExperience > 99 ||
      isNaN(anneesExperience) ||
      isNaN(idMedecin) ||
      isNaN(idService)
    ) {
      alert("Veuillez entrer un nombre entre 0 et 99.");
      return;
    }

    this.medecinsAjoutes.push({ ...this.medecin });
    this.medecin = {
      idMedecin: '',
      prenom: '',
      nom: '',
      specialite: '',
      anneesExperience: '',
      idService: '',
    };
  }
  ngOnInit(): void {
    // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
    this.communicationService.getMedecins().subscribe((medecinsAjoutes) => {
      this.medecinsAjoutes = medecinsAjoutes;
    });
  }
}
