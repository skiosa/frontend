import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in-guard.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { WelcomePageComponent } from './pages/welcome/welcome-page.component';


const routes: Routes = [

  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: 'subscriptions',
    canActivate: [LoggedInGuard],
    component: SubscriptionComponent
  },
  {
	path: 'feed',
	loadChildren: () =>
		import('./pages/feed/feed.module').then((m) => m.FeedModule),
},

  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: '404',
    component: NotFoundComponent
  },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
