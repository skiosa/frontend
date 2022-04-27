import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
	},
	{
		path: 'article', 
		loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule)
	},
	{
		path: '**',
		redirectTo: '404'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
