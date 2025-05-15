import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class PatientsModule { }
