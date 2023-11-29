import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Medecins } from "../member.interface";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "hospital_bd",
    password: "ziani200",
    port: 5432, // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async getMedecins(): Promise<Medecins[]> {
    const client = await this.pool.connect();
    try {
      // const result = await client.query("SELECT * FROM hospital_bd.Medecins");
      const result = await client.query("SELECT * FROM Medecins");
      return result.rows as Medecins[];
    } catch (err) {
      console.error("Error during query execution", err);
      throw err;
    } finally {
      client.release();
    }
  }

  public async supprimerMedecin(id: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("DELETE FROM Medecins WHERE idMedecin = $1", [id]);
    } catch (err) {
      console.error(
        "Erreur lors de la suppression du médecin dans la base de données",
        err
      );
      throw err;
    } finally {
      client.release();
    }
  }
}
