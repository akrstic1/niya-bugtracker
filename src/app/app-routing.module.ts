import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './core/guard/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './core/guard/is-not-authenticated.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [IsNotAuthenticatedGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'index',
    component: MainLayoutComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./modules/project/project.module').then(
            (m) => m.ProjectModule
          ),
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./modules/ticket/ticket.module').then((m) => m.TicketModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
