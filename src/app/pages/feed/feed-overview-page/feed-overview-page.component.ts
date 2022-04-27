import { Component, OnInit  } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Article, Feed } from 'skiosa-orm';
import { GENERAL_FEED_QUERY } from '../../../core/queries/feeds';
import { PartialExcept } from 'src/app/util/types';


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
  public newestArticles: PartialExcept<Article, 'id' | 'title' | 'description' | 'publishedAt'>[] = [];
  private feedID = 1;

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
						  publishedAt: new Date(article.publishedAt)
					  	}	
				})
			  };
			  this.sortArticlesOfFeed();
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
		console.log("dsadsadsadsadsadasdasd");
	}

  }


  firstColor = 21;
  secondColor = 22;
  thirdColor = 23;
  fourthColor = 24;


}
