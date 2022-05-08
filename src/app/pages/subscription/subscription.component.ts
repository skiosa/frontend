import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SUBSCRIPTION_QUERY, SUBSCRIPTION_QUERY_RESPONSE } from 'src/app/core/queries/subscription';
import { getColorSeedFromArticle } from 'src/app/util/randomColor';

@Component({
	selector: 'app-subscription',
	templateUrl: './subscription.component.html',
	styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
	subscriptions: SUBSCRIPTION_QUERY_RESPONSE['subscriptions'] = [];
	visibleSubscriptions: Set<number> = new Set();
	private skip = 0;
	private take = 10;

	constructor(private apollo: Apollo) { }

	ngOnInit(): void {
		this.apollo
			.watchQuery<SUBSCRIPTION_QUERY_RESPONSE>({
				query: SUBSCRIPTION_QUERY,
				variables: {
					PaginationArg: {
						skip: this.skip,
						take: this.take,
					},
					Desc: true,
				},
			})
			.valueChanges.subscribe(({ data }) => {
				this.subscriptions = data.subscriptions;
			});
	}

	/**
	 * @author Amos Gross
	 * @summary generates open lamda
	 * @description generates open lambda to delete feed from visible feeds
	 * @param feedId - feed id
	 * @returns {Function} lambda for mutating open state
	 */
	generateOnOpen = (feedId: number): (() => void) => {
		return () => {
			this.visibleSubscriptions.add(feedId);
		};
	};

	/**
	 * @author Amos Gross
	 * @summary generates close lamda
	 * @description generates close lambda to delete feed from visible feeds
	 * @param feedId - feed id
	 * @returns {Function} lambda for mutating open state
	 */
	generateOnClose = (feedId: number): (() => void) => {
		return () => {
			this.visibleSubscriptions.delete(feedId);
		};
	};

	getColorSeed(article: SUBSCRIPTION_QUERY_RESPONSE['subscriptions'][0]['articles'][0]): number {
		return getColorSeedFromArticle(article);
	}
}
