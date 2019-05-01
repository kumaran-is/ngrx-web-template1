import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { AppShellComponent } from '@layout/app-shell/app-shell.component';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'auth',
        loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule)
      },
      { path: 'cart', loadChildren: () => import('@app/cart/cart.module').then(m => m.CartModule) },
      {
        path: 'under-maintenance',
        loadChildren:
          () => import('@app/under-maintenance/under-maintenance.module').then(m => m.UnderMaintenanceModule)
      },
      { path: '', pathMatch: 'full', redirectTo: 'home' }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('@app/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}