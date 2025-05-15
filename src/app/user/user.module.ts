import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    ListComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class UserModule { }
