import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
	SINGLE_ARTICLE_QUERY,
	SINGLE_ARTICLE_QUERY_RESPONSE,
} from 'src/app/core/queries/singleArticle';
import { getColorSeedFromArticle } from 'src/app/util/randomColor';


@Component({
	selector: 'app-article-view',
	templateUrl: './article-view.component.html',
	styleUrls: ['./article-view.component.css'],
})
export class ArticleViewComponent implements OnInit {
	public article: SINGLE_ARTICLE_QUERY_RESPONSE['article'] = {
		title: 'Loading...',
		content: 'Loading...',
		url: '',
		feed: {
			id: -1,
		},
	};
	public recommendedArticles: SINGLE_ARTICLE_QUERY_RESPONSE['similarArticles'] = [];

	constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) { }

	ngOnInit() {
		const articleId = this.route.snapshot.paramMap.get('articleId');
		if (!articleId || isNaN(+articleId)) {
			throw new Error('Invalid article id');
		}
		const id = parseInt(articleId, 10);
		this.loadArticle(id);
	}

	/**
	 * @author Jonas Eppard
	 * @summary Loads Article
	 * @description Gets ID and try to load article from api
	 * @param {number} id - id of article to load
	 */
	loadArticle(id: number) {
		this.apollo
			.watchQuery<SINGLE_ARTICLE_QUERY_RESPONSE>({
				query: SINGLE_ARTICLE_QUERY,
				variables: {
					articleId: id,
				},
			})
			.valueChanges.subscribe(({ data }) => {
				this.article = data.article;
				this.recommendedArticles = data.similarArticles;
			});
	}

	getColorSeed(article: SINGLE_ARTICLE_QUERY_RESPONSE["similarArticles"][0]): number {
		return getColorSeedFromArticle(article);
	}

	redirectToArticleId(id: number) {
		this.router.navigate(['/article', id]);
		this.loadArticle(id);
	}
	redirectToFeedId(id: number) {
		this.router.navigate(['/feed', id]);
	}
	redirectToUrl(url: string) {
		window.open(url, '_blank');
	}
}
