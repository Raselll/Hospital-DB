import { Component, OnInit } from "@angular/core";
import { Medecins } from "../member.interface";

@Component({
  selector: "app-ajout",
  templateUrl: "./ajout.component.html",
  styleUrls: ["./ajout.component.css"],
})
export class AjoutComponent implements OnInit {
  medecin: Medecins = {
    idMedecin: "0",
    prenom: "Marie",
    nom: "Rousseau",
    specialite: "Dermatologie",
    anneesExperience: "8",
    idService: "3",
  };

  medecinsAjoutes: Medecins[] = [];

  constructor() {}

  idMedecinInvalide: boolean = false;
  prenomInvalide: boolean = false;
  nomInvalide: boolean = false;
  annneesExperienceInvalide: boolean = false;

  formValide() {
    return (
      this.medecin.idMedecin &&
      this.medecin.prenom &&
      this.medecin.nom &&
      this.medecin.specialite &&
      this.medecin.anneesExperience &&
      this.medecin.idService
    );
  }

  validerNombre(event: KeyboardEvent, champ: string): void {
    const caractereValide = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    const estValide = caractereValide.test(inputChar);
    let message = "";

    if (champ === "idMedecin") {
      this.idMedecinInvalide = !estValide;
      message =
        "Veuillez entrer uniquement des chiffres pour l'identifiant du médecin.";
    }

    if (!estValide) {
      event.preventDefault();
      alert(message);
    }
  }

  validerLettres(event: KeyboardEvent, champ: string): void {
    const pattern = /[a-zA-ZàâæäéèêëîïôœöùûüÿçÀÂÆÄÉÈÊËÎÏÔŒÖÙÛÜŸÇ]/;
    const inputChar = String.fromCharCode(event.charCode);
    const estValide = pattern.test(inputChar);
    let message = "";

    if (champ === "prenom") {
      this.prenomInvalide = !estValide;
      message = "Veuillez entrer uniquement des lettres pour le prénom.";
    } else if (champ === "nom") {
      this.nomInvalide = !estValide;
      message = "Veuillez entrer uniquement des lettres pour le nom.";
    }

    if (!estValide) {
      event.preventDefault();
      alert(message);
    }
  }

  ngOnInit(): void {
    const savedMedecins = localStorage.getItem("medecinsAjoutes");
    if (savedMedecins) {
      this.medecinsAjoutes = JSON.parse(savedMedecins);
    }
  }

  ajouterMedecin(): void {
    const nouveauMedecin: Medecins = {
      idMedecin: this.medecin.idMedecin,
      prenom: this.medecin.prenom,
      nom: this.medecin.nom,
      specialite: this.medecin.specialite,
      anneesExperience: this.medecin.anneesExperience,
      idService: this.medecin.idService,
    };
  
    const nouveauMedecinId: string = nouveauMedecin.idMedecin;
    const medecinExiste: boolean = this.medecinsAjoutes.some(
      (medecin) => medecin.idMedecin === nouveauMedecinId
    );
  
    const experienceValide: boolean =
      parseInt(this.medecin.anneesExperience) >= 0 &&
      parseInt(this.medecin.anneesExperience) <= 99;
  
    if (!medecinExiste && experienceValide) {
      const idExisteDeja: boolean = this.medecinsAjoutes.some(
        (medecin) => medecin.idMedecin === nouveauMedecinId
      );
  
      if (!idExisteDeja) {
        this.medecinsAjoutes.push({ ...this.medecin });
        this.medecin = {
          idMedecin: "",
          prenom: "",
          nom: "",
          specialite: "",
          anneesExperience: "",
          idService: "",
        };
        localStorage.setItem(
          "medecinsAjoutes",
          JSON.stringify(this.medecinsAjoutes)
        );
      } else {
        alert("Ce médecin existe déjà dans la liste.");
      }
    } else if (!experienceValide) {
      alert("L'année d'expérience doit être comprise entre 0 et 99.");
    } else {
      alert("Un médecin avec cet identifiant existe déjà dans la liste.");
    }
  }
  }
}  