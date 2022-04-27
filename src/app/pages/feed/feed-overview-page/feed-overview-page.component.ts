import { Component, OnInit  } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Article, Category, Feed } from 'skiosa-orm';
import { GENERAL_FEED_QUERY, GENERAL_FEED_QUERY_RESPONCE } from '../../../core/queries/feeds';
import { PartialExcept } from 'src/app/util/types';
import { min } from 'rxjs';
import { GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY } from 'src/app/core/queries/subscriotionsFromUser';
import { GENERAL_FEED_SUB_MUTATION } from 'src/app/core/mutations/subsscription';


@Component({
	selector: 'app-feed-overview-page',
	templateUrl: './feed-overview-page.component.html',
	styleUrls: ['./feed-overview-page.component.css']
})
export class FeedOverviewPageComponent implements OnInit {
	constructor(private apollo: Apollo) { }

  public feed: Feed = {
	id: 0,
	link: '',
	ttl: 0,
	description: '',
	name: ''
  };

  public feedIDsOfSubscribedFeed: number[] = [];
  public newestArticles: Article[] = [];
  private feedID = 1;
  private isSubscribed : boolean = false;



  ngOnInit(): void {
  	this.apollo
  		.watchQuery({
  			query: GENERAL_FEED_QUERY, variables: {
  				feedId: this.feedID
  			}
  		}).valueChanges.subscribe((data: {data: any}) => {
				const {feed}: {feed: Feed} = data.data;
				if (feed.articles)

			  this.feed = {
				  ...feed,
				  articles: feed.articles.map(article => {
					  return {
						  ...article,
						  publishedAt: new Date(article.publishedAt), 
					  	}	
				})
			  };
			  this.sortArticlesOfFeed();
		  	});

	this.apollo.watchQuery({
		query: GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY , variables: {
			userId: 1,
			name: '',
		}
	}).valueChanges.subscribe((data: {data: any}) => {
		const {subscriptions}: {subscriptions: number[]} = data.data;
		 if (subscriptions && subscriptions.length > 0) {
			 this.feedIDsOfSubscribedFeed = {
				 ...subscriptions
			 }
		 }
	});

	if(this.feedIDsOfSubscribedFeed.includes(this.feedID)){
		this.isSubscribed = true;
	}

  }	

   
  public changeSubscription(): void {
	this.apollo.mutate({
		mutation: GENERAL_FEED_SUB_MUTATION,
		variables: {
			feedId: this.feedID,
			isSubscribed: !this.isSubscribed
		}
	}).subscribe(({data})=>{
		console.log(data);
	});
}

  sortArticlesOfFeed(): void {
	let latesArticles = this.feed.articles;
	console.log(latesArticles);
	console.log({date: new Date()});

	if(this.feed.articles && this.feed.articles.length > 0 &&  latesArticles && latesArticles.length > 0) {
	latesArticles = latesArticles.sort((a, b) => {
		return b.publishedAt.getTime() - a.publishedAt.getTime();
});
	



}

	if (latesArticles && latesArticles.length > 0) 	{
		this.newestArticles = latesArticles;
	}



  }

  minNumber(a:number,b: number):number{
	return a>b? b:a;
  }




}
