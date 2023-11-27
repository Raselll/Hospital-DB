import { Component, OnInit } from "@angular/core";
import { Medecins } from "../member.interface";

@Component({
  selector: "app-ajout",
  templateUrl: "./ajout.component.html",
  styleUrls: ["./ajout.component.css"],
})
export class AjoutComponent implements OnInit {
  medecin: Medecins = {
    idMedecin: '0',
    prenom: 'Marie',
    nom: 'Rousseau',
    specialite: 'Dermatologie',
    anneesExperience: '8',
    idService: '3',
  };
  medecinsAjoutes: Medecins[] = [];
  
  constructor() {}

  idMedecinInvalide: boolean = false;
  prenomInvalide: boolean = false;
  nomInvalide: boolean = false;
  annneesExperienceInvalide: boolean = false;
  
  formValide() {
    return this.medecin.idMedecin && this.medecin.prenom && this.medecin.nom && this.medecin.specialite && this.medecin.anneesExperience && this.medecin.idService;
  }

  validerNombre(event: KeyboardEvent, champ: string): void {
    const caractereValide = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    const estValide = caractereValide.test(inputChar);
    let message = '';
  
    if (champ === 'idMedecin') {
      this.idMedecinInvalide = !estValide;
      message = 'Veuillez entrer uniquement des chiffres pour l\'identifiant du médecin.';
    } 
  
    if (!estValide) {
      event.preventDefault();
      alert(message);
    }
  }
  
  validerLettres(event: KeyboardEvent, champ: string): void {
    const pattern = /[a-zA-ZçéÇÉ]/;
    const inputChar = String.fromCharCode(event.charCode);
    const estValide = pattern.test(inputChar);
    let message = '';
  
    if (champ === 'prenom') {
      this.prenomInvalide = !estValide;
      message = 'Veuillez entrer uniquement des lettres pour le prénom.';
    } else if (champ === 'nom') {
      this.nomInvalide = !estValide;
      message = 'Veuillez entrer uniquement des lettres pour le nom.';
    }
  
    if (!estValide) {
      event.preventDefault();
      alert(message);
    }
  }
  
  ngOnInit(): void {
    const savedMedecins = localStorage.getItem('medecinsAjoutes');
    if (savedMedecins) {
      this.medecinsAjoutes = JSON.parse(savedMedecins);
    }
  }

  ajouterMedecin(): void {
    const medecinsValides = [
      { idMedecin: 0, prenom: 'Marie', nom: 'Rousseau', specialite: 'Dermatologie', anneesExperience: 8, idService: 3 },
      { idMedecin: 1, prenom: 'Philippe', nom: 'Lemelin', specialite: 'Neurologie', anneesExperience: 6, idService: 4 },
      { idMedecin: 2, prenom: 'Valérie', nom: 'Bélanger', specialite: 'Ophtalmologie', anneesExperience: 10, idService: 1 },
      { idMedecin: 3, prenom: 'Alex', nom: 'Michaud', specialite: 'Orthopédie', anneesExperience: 12, idService: 2 },
      { idMedecin: 4, prenom: 'Nathalie', nom: 'Gagné', specialite: 'Psychiatrie', anneesExperience: 9, idService: 3 },
      { idMedecin: 5, prenom: 'Simon', nom: 'Tremblay', specialite: 'Cardiologie', anneesExperience: 15, idService: 4 },
      { idMedecin: 6, prenom: 'Audrey', nom: 'Beaulieu', specialite: 'Pédiatrie', anneesExperience: 7, idService: 1 },
      { idMedecin: 7, prenom: 'David', nom: 'Fournier', specialite: 'Chirurgie', anneesExperience: 11, idService: 2 },
      { idMedecin: 8, prenom: 'Isabelle', nom: 'Lapointe', specialite: 'Gynécologie', anneesExperience: 14, idService: 3 },
      { idMedecin: 9, prenom: 'François', nom: 'Martel', specialite: 'Radiologie', anneesExperience: 5, idService: 4 },
    ];
  
    const nouveauMedecin = {
      idMedecin: parseInt(this.medecin.idMedecin),
      prenom: this.medecin.prenom,
      nom: this.medecin.nom,
      specialite: this.medecin.specialite,
      anneesExperience: parseInt(this.medecin.anneesExperience),
      idService: parseInt(this.medecin.idService.split(' ')[0])
    };
    const nouveauMedecinId = parseInt(this.medecin.idMedecin);
    const medecinExiste = this.medecinsAjoutes.some(medecin => parseInt(medecin.idMedecin) === nouveauMedecinId);


    if (!medecinExiste) {
      const correspondance = medecinsValides.some(medecinValide =>
        JSON.stringify(medecinValide) === JSON.stringify(nouveauMedecin)
      );
  
      if (correspondance) {
        this.medecinsAjoutes.push({ ...this.medecin });
        this.medecin = {
          idMedecin: '',
          prenom: '',
          nom: '',
          specialite: '',
          anneesExperience: '',
          idService: ''
        };
      } else {
        alert('Les données du médecin à ajouter ne correspondent pas avec un médecin dans la base de données.');
      }
      localStorage.setItem('medecinsAjoutes', JSON.stringify(this.medecinsAjoutes));
    } else {
      alert('Ce médecin existe déjà dans la liste.');
    }
  }  
}
