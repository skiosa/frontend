import { Component, OnInit  } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Feed } from 'skiosa-orm';
import { GENERAL_FEED_QUERY } from '../../../core/queries/feeds';


@Component({
	selector: 'app-feed-overview-page',
	templateUrl: './feed-overview-page.component.html',
	styleUrls: ['./feed-overview-page.component.css']
})
export class FeedOverviewPageComponent implements OnInit {
	constructor(private apollo: Apollo) { }

  public recomendedFeed: Feed | undefined;
  private feedID = 1;

  ngOnInit(): void {
  	this.apollo
  		.watchQuery({
  			query: GENERAL_FEED_QUERY, variables: {
  				feedId: this.feedID
  			}
  		});
  }



  firstColor = 21;
  secondColor = 22;
  thirdColor = 23;
  fourthColor = 24;


}
