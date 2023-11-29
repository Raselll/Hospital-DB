import { Component, OnInit } from "@angular/core";
import { Medecins } from "../member.interface";

@Component({
  selector: "app-suppression",
  templateUrl: "./suppression.component.html",
  styleUrls: ["./suppression.component.css"],
})
export class SuppressionComponent implements OnInit {
  medecinsAjoutes: Medecins[] = [];

  constructor() {}

  ngOnInit(): void {
    const savedMedecins = localStorage.getItem('medecinsAjoutes');
    if (savedMedecins) {
      this.medecinsAjoutes = JSON.parse(savedMedecins);
    }
  }

  supprimerMedecin(index: number): void {
    this.medecinsAjoutes.splice(index, 1);
    localStorage.setItem('medecinsAjoutes', JSON.stringify(this.medecinsAjoutes));
  }
}
