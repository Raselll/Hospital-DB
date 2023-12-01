import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  _router: Router = Router();

  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService)
    private readonly databaseService: DatabaseService
  ) {
    this.configureMedecins();
    this.configureSuppresion();
    this.configureModification();
  }

  public get router(): Router {
    return this._router;
  }

  private configureMedecins(): void {
    this.router.get("/medecins", async (req: any, res: any) => {
      try {
        this.databaseService.getMedecins().then((result: any) => {
          res.send(result);
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des médecins", error);
        throw error;
      }
    });
  }

  private configureSuppresion(): void {
    this.router.delete("/medecins/:id", async (req: any, res: any) => {
      try {
        this.databaseService
          .supprimerMedecin(req.params.id)
          .then((result: any) => {
            res.send(result);
          });
      } catch (error) {
        console.error("Erreur lors de la suppression du médecin", error);
        throw error;
      }
    });
  }

  private configureModification(): void {
    this.router.put("/medecins/:id", async (req: any, res: any) => {
      try {
        const id = req.params.id;
        const updatedMedecinData = req.body;

        await this.databaseService.modifierMedecin({
          idMedecin: id,
          ...updatedMedecinData,
        });

        res.send("Medecin modifié avec succès");
      } catch (error) {
        console.error("Erreur lors de la modification du médecin", error);
        throw error;
      }
    });
  }
}