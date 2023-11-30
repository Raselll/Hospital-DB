import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "../services/communication.service";
import { Medecins } from "../member.interface";

@Component({
  selector: "app-medecin",
  templateUrl: "./medecin.component.html",
  styleUrls: ["./medecin.component.css"],
})
export class MedecinComponent implements OnInit {
  medecins: Medecins[] = [];
  medecinsAjoutes: Medecins[] = [];

  constructor(
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    // Récupération des médecins à partir du service de communication
    this.communicationService.getMedecins().subscribe((medecins) => {
      this.medecins = medecins;
    });

    // Récupération des médecins ajoutés à partir du stockage local
    const savedMedecins = localStorage.getItem("medecinsAjoutes");
    if (savedMedecins) {
      this.medecinsAjoutes = JSON.parse(savedMedecins);
    }
  }
}
