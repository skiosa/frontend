import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedOverviewPageComponent } from './feed-overview-page/feed-overview-page.component';
import { FeedRoutingModule } from './feed-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
	declarations: [
		FeedOverviewPageComponent
	],
	imports: [ CommonModule, FeedRoutingModule,SharedModule, HttpClientModule	]
})
export class FeedModule { }
