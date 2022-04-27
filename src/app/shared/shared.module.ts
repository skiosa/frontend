import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ArticleComponent } from './article/article.component';
import { SubscriptionFeedComponent } from './subscription-feed/subscription-feed.component';
import { IconButtonComponent } from './icon-button/icon-button.component';

@NgModule({
  declarations: [CardComponent, ArticleComponent, SubscriptionFeedComponent, IconButtonComponent],
  imports: [CommonModule],
  exports: [CardComponent, ArticleComponent, SubscriptionFeedComponent, IconButtonComponent],
})
export class SharedModule { }
