import { Component, OnInit  } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GENERAL_FEED_QUERY } from '../../../core/queries/feeds';


@Component({
	selector: 'app-feed-overview-page',
	templateUrl: './feed-overview-page.component.html',
	styleUrls: ['./feed-overview-page.component.css']
})
export class FeedOverviewPageComponent implements OnInit {
  constructor(private apollo: Apollo) { }

  private seed: number = Math.random();
	private skip = 0;
	private take = 10;
  private feedID = 1;

  ngOnInit(): void {
    this.apollo
    .watchQuery({
      query: GENERAL_FEED_QUERY, variables: {
        seed: this.seed,
					PaginationArg: {
						skip: this.skip,
						take: this.take,
					},
          feedId: this.feedID
      }
    })
  }



  firstColor = 21;
  secondColor = 22;
  thirdColor = 23;
  fourthColor = 24;


}
