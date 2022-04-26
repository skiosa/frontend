import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
