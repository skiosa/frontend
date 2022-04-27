import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ArticleComponent } from './article/article.component';
import { IconButtonComponent } from './icon-button/icon-button.component';

@NgModule({
	declarations: [CardComponent, ArticleComponent, IconButtonComponent],
	imports: [CommonModule],
	exports: [CardComponent, ArticleComponent],
})
export class SharedModule {}
