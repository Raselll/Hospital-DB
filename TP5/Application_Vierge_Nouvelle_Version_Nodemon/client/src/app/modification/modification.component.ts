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

  saveChanges(medecin: Medecins): void {
    if (this.isEditing[medecin.idMedecin]) {
      const index = this.medecinsAjoutes.findIndex(m => m.idMedecin === medecin.idMedecin);
      if (index !== -1) {
        this.medecinsAjoutes[index].prenom = medecin.prenom;
        this.medecinsAjoutes[index].nom = medecin.nom;
        this.medecinsAjoutes[index].specialite = medecin.specialite;
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
