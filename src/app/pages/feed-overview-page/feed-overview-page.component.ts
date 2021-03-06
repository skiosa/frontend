import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { KeycloakService } from 'keycloak-angular';
import { GENERAL_FEED_SUB_MUTATION } from 'src/app/core/mutations/subscription';
import { GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY } from 'src/app/core/queries/subscriotionsFromUser';
import { DEFAULT_PASTEL_COLOR, generateRandomColor, getColorSeedFromArticle } from 'src/app/util/randomColor';
import { GENERAL_FEED_QUERY, GENERAL_FEED_QUERY_RESPONCE } from '../../core/queries/feeds';

@Component({
	selector: 'app-feed-overview-page',
	templateUrl: './feed-overview-page.component.html',
	styleUrls: ['./feed-overview-page.component.css'],
})
export class FeedOverviewPageComponent implements OnInit {
	constructor(
		private apollo: Apollo,
		private route: ActivatedRoute,
		private router: Router,
		private readonly keycloak: KeycloakService
	) {}

	public feed: GENERAL_FEED_QUERY_RESPONCE['feed'] = {
		id: -1,
		link: '',
		name: 'Loading...',
		description: '',
		articles: [],
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
		this.route.params.subscribe((params) => {
			const idString = params['feedId'];

			if (!idString || isNaN(+idString)) {
				this.router.navigate(['/404'], { skipLocationChange: true });
				return;
			}

			this.feedID = +idString;
			this.color = generateRandomColor(this.feedID);
			this.loadFeed();
		});
	}

	loadFeed() {
		this.apollo
			.watchQuery({
				query: GENERAL_FEED_QUERY,
				variables: {
					feedId: this.feedID,
					desc: true,
				},
			})
			.valueChanges.subscribe((data) => {
				this.feed = JSON.parse(JSON.stringify(data.data.feed));
			});

		this.keycloak.isLoggedIn().then((isLoggedIn) => {
			if (isLoggedIn) {
				this.apollo
					.watchQuery({
						query: GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY,
					})
					.valueChanges.subscribe(({ data }) => {
						const feedIDsOfSubscribedFeed = data.subscriptions.map((s) => s.id);
						this.isSubscribed = feedIDsOfSubscribedFeed.includes(this.feedID);
					});
			}
		});
	}

	/**
	 * @author Marcel Alex, Jonas Eppard, Lukas Huida, Tim Horlacher, Amos Gross
	 * @summary toggles subscription status
	 * @description subscribes and unsubscribes user from feed
	 */
	public changeSubscription(): void {
		this.keycloak.isLoggedIn().then((isLoggedIn) => {
			if (!isLoggedIn) {
				this.keycloak.login();
			}
			this.apollo
				.mutate({
					mutation: GENERAL_FEED_SUB_MUTATION,
					variables: {
						feedId: this.feedID,
						isSubscribed: !this.isSubscribed,
					},
				})
				.subscribe((data) => {
					this.isSubscribed = data.data?.changeSubscription ?? this.isSubscribed;
				});
		});
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

	getColorSeed(article: GENERAL_FEED_QUERY_RESPONCE['feed']['articles'][0]): number {
		return getColorSeedFromArticle(article);
	}
}
