import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "../services/communication.service";
import { Medecins } from "../member.interface";

@Component({
  selector: "app-modification",
  templateUrl: "./modification.component.html",
  styleUrls: ["./modification.component.css"],
})
export class ModificationComponent implements OnInit {
  medecins: Medecins[] = [];
  isEditing: { [key: string]: boolean } = {};

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.communicationService
      .getMedecins()
      .subscribe((medecins: Medecins[]) => {
        this.medecins = medecins;
        this.medecins.forEach((medecin) => {
          this.isEditing[medecin.idMedecin] = false;
        });
      });
  }

  toggleEdit(id: string): void {
    this.isEditing[id] = !this.isEditing[id];
  }

  saveChanges(medecin: Medecins): void {
    if (this.isEditing[medecin.idMedecin]) {
      this.communicationService.modifierMedecin(medecin).subscribe(
        () => {
          console.log("Médecin modifié avec succès");
          this.toggleEdit(medecin.idMedecin);
        },
        (error) => {
          console.error("Erreur lors de la modification du médecin", error);
        }
      );
    }
  }
}
