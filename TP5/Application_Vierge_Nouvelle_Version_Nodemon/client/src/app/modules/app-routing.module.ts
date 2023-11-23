import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { AjoutComponent } from "../ajout/ajout.component";
import { SuppressionComponent } from "../suppression/suppression.component";
import { ModificationComponent } from "../modification/modification.component";
import { MedecinComponent } from "../medecin/medecin.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "medecin", component: MedecinComponent },
  { path: "ajout", component: AjoutComponent },
  { path: "suppression", component: SuppressionComponent },
  { path: "modification", component: ModificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
