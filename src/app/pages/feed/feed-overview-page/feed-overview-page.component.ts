import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GENERAL_FEED_QUERY, GENERAL_FEED_QUERY_RESPONCE } from '../../../core/queries/feeds';
import { GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY } from 'src/app/core/queries/subscriotionsFromUser';
import { GENERAL_FEED_SUB_MUTATION } from 'src/app/core/mutations/subsscription';
import { DEFAULT_PASTEL_COLOR, generateRandomColor } from 'src/app/core/utils/randomColor';
import { ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-feed-overview-page',
	templateUrl: './feed-overview-page.component.html',
	styleUrls: ['./feed-overview-page.component.css']
})
export class FeedOverviewPageComponent implements OnInit {
	constructor(private apollo: Apollo, private route: ActivatedRoute) { }

	public feed: GENERAL_FEED_QUERY_RESPONCE["feed"] = {
		id: 0,
		link: '',
		name: '',
		description: '',
		articles: []
	};
	private feedID = 1;
	private isSubscribed: boolean = false;
	public color: string = DEFAULT_PASTEL_COLOR;



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

		this.apollo.watchQuery({
			query: GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY
		}).valueChanges.subscribe(({ data }) => {
			const feedIDsOfSubscribedFeed = data.subscriptions.map(s => s.id);
			this.isSubscribed = feedIDsOfSubscribedFeed.includes(this.feedID)
		});

	}


	public changeSubscription(): void {
		this.apollo.mutate({
			mutation: GENERAL_FEED_SUB_MUTATION,
			variables: {
				feedId: this.feedID,
				isSubscribed: !this.isSubscribed
			}
		}).subscribe(({ data }) => {
			this.isSubscribed = data?.isSubscribed ?? this.isSubscribed
		});
	}

	sortArticlesOfFeed(): void {
		this.feed.articles = this.feed.articles.sort((a, b) => {
			return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
		})
	}

	minNumber(a: number, b: number): number {
		return a > b ? b : a;
	}




}
