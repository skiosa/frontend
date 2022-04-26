import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
	},
	{ path: '/feed-overview',
		redirectTo:('./pages/feed-overview/feed-overview.module'),
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
