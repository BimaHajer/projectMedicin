import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RendezVousRoutingModule } from './rendez-vous-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjouteComponent } from './ajoute/ajoute.component';
import { Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    AjouteComponent
  ],
  imports: [
    CommonModule,
    RendezVousRoutingModule,FormsModule,ReactiveFormsModule,RouterModule
  ]
})
export class RendezVousModule { }
