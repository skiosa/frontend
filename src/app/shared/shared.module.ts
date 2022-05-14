import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { ArticleComponent } from './article/article.component';
import { FeedComponent } from './feed/feed.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';

@NgModule({
	declarations: [
		CardComponent,
		ArticleComponent,
		FeedComponent,
		NavButtonComponent,
		ButtonComponent,
		InputComponent,
		IconButtonComponent,
	],
	imports: [CommonModule, FormsModule],
	exports: [
		CardComponent,
		ArticleComponent,
		FeedComponent,
		NavButtonComponent,
		ButtonComponent,
		InputComponent,
		IconButtonComponent,
	],
})
export class SharedModule {}
