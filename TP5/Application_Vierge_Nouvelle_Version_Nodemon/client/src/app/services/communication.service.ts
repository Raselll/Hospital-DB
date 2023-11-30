// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Medecins } from "../member.interface";

@Injectable({
  providedIn: "root",
})
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private readonly BASE_URL: string = "http://localhost:3000/database";

  public constructor(private readonly http: HttpClient) {}

  getMedecins(): Observable<Medecins[]> {
    return this.http.get<Medecins[]>(`${this.BASE_URL}/medecins`);
  }

  supprimerMedecin(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/medecins/${id}`);
  }

  getMedecinById(idMedecin: string): Observable<Medecins> {
    return this.http.get<Medecins>(`${this.BASE_URL}/medecins/${idMedecin}`);
  }

  modifierMedecin(medecin: Medecins): Observable<Medecins> {
    return this.http.put<Medecins>(`${this.BASE_URL}/medecins/${medecin.idMedecin}`, medecin);
  }

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  // private handleError<T>(
  //   request: string,
  //   result?: T
  // ): (error: Error) => Observable<T> {
  //   return (error: Error): Observable<T> => {
  //     return of(result as T);
  //   };
  // }
}
