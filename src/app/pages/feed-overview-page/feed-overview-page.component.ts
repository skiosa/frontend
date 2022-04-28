import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GENERAL_FEED_QUERY, GENERAL_FEED_QUERY_RESPONCE } from '../../core/queries/feeds';
import { GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY } from 'src/app/core/queries/subscriotionsFromUser';
import { GENERAL_FEED_SUB_MUTATION } from 'src/app/core/mutations/subscription';
import { DEFAULT_PASTEL_COLOR, generateRandomColor } from 'src/app/util/randomColor';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';


@Component({
	selector: 'app-feed-overview-page',
	templateUrl: './feed-overview-page.component.html',
	styleUrls: ['./feed-overview-page.component.css']
})
export class FeedOverviewPageComponent implements OnInit {
	constructor(private apollo: Apollo, private route: ActivatedRoute, private readonly keycloak: KeycloakService) { }

	public feed: GENERAL_FEED_QUERY_RESPONCE["feed"] = {
		id: -1,
		link: '',
		name: 'Loading...',
		description: '',
		articles: []
	};
	private feedID = -1;
	public isSubscribed: boolean = false;
	public color: string = DEFAULT_PASTEL_COLOR;


  /**
   * @author Marcel Alex, Jonas Eppard, Lukas Huida, Tim Horlacher, Amos Gross
   * @summary initializes and formats feed and article info
   * @description initializes newest articles, subscription status and all other articles of feed from graphql
   */
	ngOnInit(): void {
		const idString = this.route.snapshot.paramMap.get('feedId')
		if (!idString || isNaN(+idString)) {
			window.location.href = '/404';
			return
		}
		this.feedID = +idString
		this.color = generateRandomColor(this.feedID);
		this.apollo
			.watchQuery({
				query: GENERAL_FEED_QUERY, variables: {
					feedId: this.feedID
				}
			}).valueChanges.subscribe((data) => {
				this.feed = JSON.parse(JSON.stringify(data.data.feed));
				console.log(this.feed)
				this.sortArticlesOfFeed();
			});

		this.keycloak.isLoggedIn().then(isLoggedIn => {
			if (isLoggedIn) {
				this.apollo.watchQuery({
					query: GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY
				}).valueChanges.subscribe(({ data }) => {
					const feedIDsOfSubscribedFeed = data.subscriptions.map(s => s.id);
					this.isSubscribed = feedIDsOfSubscribedFeed.includes(this.feedID)
				});
			}
		})

	}

  /**
   * @author Marcel Alex, Jonas Eppard, Lukas Huida, Tim Horlacher, Amos Gross
   * @summary toggles subscription status
   * @description subscribes and unsubscribes user from feed
   */
	public changeSubscription(): void {
		this.keycloak.isLoggedIn().then(isLoggedIn => {
			if (!isLoggedIn) {
				this.keycloak.login();
			}
			this.apollo.mutate({
				mutation: GENERAL_FEED_SUB_MUTATION,
				variables: {
					feedId: this.feedID,
					isSubscribed: !this.isSubscribed
				}
			}).subscribe((data) => {
				this.isSubscribed = data.data?.isSubscribed ?? this.isSubscribed
			});
		})
	}

  /**
   * @author Marcel Alex, Jonas Eppard, Lukas Huida, Tim Horlacher, Amos Gross
   * @summary sorts articles
   * @description sorts articles of feed (from component)
   */
	sortArticlesOfFeed(): void {
		this.feed.articles = this.feed.articles.sort((a, b) => {
			return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
		})
	}

  /**
   * @author Marcel Alex, Jonas Eppard, Lukas Huida, Tim Horlacher, Amos Gross
   * @summary returns smaller number
   * @description returns smaller number 
   * @returns {number} smaller number
   */
	minNumber(a: number, b: number): number {
		return a > b ? b : a;
	}
}
