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
    this.communicationService.getMedecins().subscribe((medecins) => {
      this.medecins = medecins;
    });

    const savedMedecins = localStorage.getItem("medecinsAjoutes");
    if (savedMedecins) {
      this.medecinsAjoutes = JSON.parse(savedMedecins);
    }
  }
}
