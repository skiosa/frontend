import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ArticleComponent } from './article/article.component';
import { FeedComponent } from './feed/feed.component';
import { SubscriptionFeedComponent } from './subscription-feed/subscription-feed.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [CardComponent, ArticleComponent, FeedComponent, SubscriptionFeedComponent, NavButtonComponent, ButtonComponent, IconButtonComponent],
  imports: [CommonModule],
  exports: [CardComponent, ArticleComponent, FeedComponent, SubscriptionFeedComponent, NavButtonComponent, ButtonComponent, IconButtonComponent],
})
export class SharedModule { }
