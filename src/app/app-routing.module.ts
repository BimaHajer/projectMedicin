import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'laboratory',
    loadChildren: () => import('./laboratory/laboratory.module').then(m => m.LaboratoryModule)
  },
  {
    path: 'patients',
    canActivate: [AuthGuard],
    loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule)
  },
  {path: 'rendez-vous',
      loadChildren: () => import('./rendez-vous/rendez-vous.module').then(m => m.RendezVousModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
