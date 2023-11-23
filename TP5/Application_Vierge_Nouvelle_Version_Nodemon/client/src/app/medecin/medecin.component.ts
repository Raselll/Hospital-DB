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

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {
    // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
    this.communicationService.getMedecins().subscribe((medecins) => {
      this.medecins = medecins;
    });
  }
}
