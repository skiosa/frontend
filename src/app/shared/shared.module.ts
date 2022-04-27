import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ArticleComponent } from './article/article.component';
import { SubscriptionFeedComponent } from './subscription-feed/subscription-feed.component';

@NgModule({
  declarations: [CardComponent, ArticleComponent, SubscriptionFeedComponent],
  imports: [CommonModule],
  exports: [CardComponent, ArticleComponent, SubscriptionFeedComponent],
})
export class SharedModule { }
