// import { Router, Request, Response } from "express";
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

  // router.get("/medecins", async (req: Request, res: Response) => {
  //   try {
  //     const medecins = await this.databaseService.getMedecins();
  //     res.json(medecins);
  //   } catch (error) {
  //     res.status(500).json({ error: "Erreur lors de la récupération des médecins" });
  //   }
  // });

  // return router;
}
