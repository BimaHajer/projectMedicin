import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class CoreModule { }
