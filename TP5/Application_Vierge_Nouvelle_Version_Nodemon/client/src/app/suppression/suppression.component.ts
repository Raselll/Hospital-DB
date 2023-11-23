import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommunicationService } from "../services/communication.service";

@Component({
  selector: "app-suppression",
  templateUrl: "./suppression.component.html",
  styleUrls: ["./suppression.component.css"],
})
export class SuppressionComponent implements OnInit {
  medecinId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.medecinId = params["id"];
    });
  }

  supprimerMedecin(): void {
    if (this.medecinId) {
      this.communicationService.supprimerMedecin(this.medecinId).subscribe(
        () => {
          this.router.navigate(["/medecin"]);
        },
        (error) => {
          console.error("Erreur lors de la suppression du médecin", error);
        }
      );
    }
  }
}
