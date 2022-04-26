import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedOverviewPageComponent } from './feed-overview-page/feed-overview-page.component';

const routes: Routes = [{ path: '', component: FeedOverviewPageComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FeedRoutingModule {} 
