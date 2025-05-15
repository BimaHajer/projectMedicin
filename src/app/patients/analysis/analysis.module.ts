import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AddComponent,
    UpdateComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    AnalysisRoutingModule,ReactiveFormsModule,FormsModule,RouterModule
  ]
})
export class AnalysisModule { }
