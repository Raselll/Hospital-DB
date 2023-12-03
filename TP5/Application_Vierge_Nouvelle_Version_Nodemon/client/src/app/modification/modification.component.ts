import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { Medecins } from '../member.interface';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {
  medecins: Medecins[] = [];
  medecinsAjoutes: Medecins[] = [];
  isEditing: { [key: string]: boolean } = {};
  numerosService: number[] = Array.from({ length: 10 }, (_, i) => i); 
  specialites: string[] = ["Dermatologie", 
                           "Neurologie", 
                           "Ophtalmologie", 
                           "Orthopédie", 
                           "Psychiatrie", 
                           "Cardiologie", 
                           "Pédiatrie", 
                           "Chirurgie", 
                           "Gynécologie", 
                           "Radiologie"];
                           
  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.getMedecins().subscribe((medecins) => {
      this.medecins = medecins;
    });

    const savedMedecins = localStorage.getItem("medecinsAjoutes");
    if (savedMedecins) {
      this.medecinsAjoutes = JSON.parse(savedMedecins);
      this.medecinsAjoutes.forEach(medecin => {
        this.isEditing[medecin.idMedecin] = false;
      });
    }
  }

  toggleEdit(id: string): void {
    this.isEditing[id] = !this.isEditing[id];
  }

  validateLetters(input: string): boolean {
    const lettersPattern = /[a-zA-ZàâæäéèêëîïôœöùûüÿçÀÂÆÄÉÈÊËÎÏÔŒÖÙÛÜŸÇ]/;
    return lettersPattern.test(input);
  }

  saveChanges(medecin: Medecins): void {
    if (this.isEditing[medecin.idMedecin]) {
      const index = this.medecinsAjoutes.findIndex(m => m.idMedecin === medecin.idMedecin);
      if (index !== -1) {
        if (!this.validateLetters(medecin.prenom) || !this.validateLetters(medecin.nom)) {
          alert('Le prénom et le nom doivent contenir uniquement des lettres majuscules ou minuscules.');
          return; 
        }
        
        const anneesExperienceValue = +medecin.anneesExperience;
        if (isNaN(anneesExperienceValue) || anneesExperienceValue < 0 || anneesExperienceValue > 99) {
          alert('Les années d\'expérience doivent être un nombre compris entre 0 et 99.');
          return; // Arrêter l'exécution si la validation échoue
        }
        this.medecinsAjoutes[index].anneesExperience = medecin.anneesExperience;
        this.medecinsAjoutes[index].idService = medecin.idService;

        localStorage.setItem("medecinsAjoutes", JSON.stringify(this.medecinsAjoutes));
        console.log('Modifications du médecin enregistrées avec succès');
        this.toggleEdit(medecin.idMedecin);
      } else {
        console.error('Médecin non trouvé dans le stockage local');
      }
    }
  }
}
