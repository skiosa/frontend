import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
	declarations: [CardComponent, ArticleComponent],
	imports: [CommonModule],
	exports: [CardComponent, ArticleComponent],
})
export class SharedModule {}
