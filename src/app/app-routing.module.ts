import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in-guard.guard';
import { ArticleViewComponent } from './pages/article-view/article-view.component';
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
    path: 'article/:articleId',
    component: ArticleViewComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
