import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorairesRoutingModule } from './horaires-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    DetailComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    HorairesRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class HorairesModule { }
