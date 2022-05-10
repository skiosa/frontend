import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in-guard.guard';
import { ArticleViewComponent } from './pages/article-view/article-view.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { FeedOverviewPageComponent } from './pages/feed-overview-page/feed-overview-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomePageComponent } from './pages/welcome/welcome-page.component';

const routes: Routes = [
	{
		path: '',
		component: WelcomePageComponent,
	},
	{
		path: 'subscriptions',
		canActivate: [LoggedInGuard],
		loadChildren: () =>
			import('./pages/subscription-page/subscription-page.module').then((m) => m.SubscriptionPageModule),
	},
	{
		path: 'bookmarks',
		canActivate: [LoggedInGuard],
		component: BookmarkComponent,
	},
	{
		path: 'article/:articleId',
		component: ArticleViewComponent,
	},
	{
		path: 'feed/:feedId',
		component: FeedOverviewPageComponent,
	},
	{
		path: '404',
		component: NotFoundComponent,
	},
	{
		path: '**',
		redirectTo: '404',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
