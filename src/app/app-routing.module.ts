import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
      path: 'subscriptions',
      canActivate: [LoggedInGuard],
      loadChildren: () => import('./pages/subscription/subscription.module').then((m) => m.SubscriptionModule)
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
      path: '404',
      loadChildren: () =>
      import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
