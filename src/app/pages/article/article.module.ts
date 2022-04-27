import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';


@NgModule({
	declarations: [
		ArticleComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ArticleRoutingModule
	]
})
export class ArticleModule { }
