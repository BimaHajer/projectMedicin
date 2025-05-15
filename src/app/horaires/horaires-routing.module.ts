import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
      {
        path: 'update/:id',
        component: UpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorairesRoutingModule { }
