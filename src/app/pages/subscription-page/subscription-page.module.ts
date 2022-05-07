import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionPageRoutingModule } from './subscription-page-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionFeedComponent } from './subscription-feed/subscription-feed.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SubscriptionComponent,
    SubscriptionFeedComponent
  ],
  imports: [
    CommonModule,
    SubscriptionPageRoutingModule,
    SharedModule
  ]
})
export class SubscriptionPageModule { }
