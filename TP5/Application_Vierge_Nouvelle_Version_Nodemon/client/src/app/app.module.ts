import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from "./modules/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PagePresentationComponent } from "./page-presentation/page-presentation.component";
import { Link1Component } from "./link1/link1.component";
import { Link2Component } from './link2/link2.component';
import { Link3Component } from './link3/link3.component';

@NgModule({
  declarations: [AppComponent, PagePresentationComponent, Link1Component, Link2Component, Link3Component],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
