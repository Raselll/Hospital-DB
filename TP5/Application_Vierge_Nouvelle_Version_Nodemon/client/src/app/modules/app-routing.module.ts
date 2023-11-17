import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { PagePresentationComponent } from "../page-presentation/page-presentation.component";
import { Link1Component } from "../link1/link1.component";
import { Link2Component } from "../link2/link2.component";
import { Link3Component } from "../link3/link3.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "page-presentation", component: PagePresentationComponent },
  { path: "link1", component: Link1Component },
  { path: "link2", component: Link2Component },
  { path: "link3", component: Link3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
