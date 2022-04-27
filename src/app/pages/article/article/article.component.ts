import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
	SINGLE_ARTICLE_QUERY,
	SINGLE_ARTICLE_QUERY_RESPONSE,
} from 'src/app/core/queries/singleArticle';

import { PartialExcept } from 'src/app/util/types';
import { Feed, Article } from 'skiosa-orm';

@Component({
	selector: 'app-article-view',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css'],
})
export class ArticleComponent {
	public article: PartialExcept<Article, 'title' | 'content' | 'url'> & { feed: PartialExcept<Feed, 'id'> } = {
		title: 'Loading...',
		content: 'Loading...',
		url: '',
		feed: {
			id: -1,
		}
	};
	public recommendedArticles: (PartialExcept<Article, 'title' | 'description' | 'id'> & { categories: { id: number, name?: string }[] })[] = [];

	constructor(private route: ActivatedRoute, private apollo: Apollo) { }

	ngOnInit() {
		const articleId = this.route.snapshot.paramMap.get('articleId');
		if (!articleId || isNaN(+articleId)) {
			throw new Error('Invalid article id');
		}
		this.apollo
			.watchQuery<SINGLE_ARTICLE_QUERY_RESPONSE>({
				query: SINGLE_ARTICLE_QUERY,
				variables: {
					articleId: parseInt(articleId, 10),
				},
			})
			.valueChanges.subscribe(({ data }) => {
				this.article = data.article;
				this.recommendedArticles = data.similarArticles;
			});
	}
	getColorSeed(article: PartialExcept<Article, 'title' | 'description' | 'id'> & { categories: { id: number, name?: string }[] }): number {
		if (article.categories) {
			return article.categories[0].id;
		}
		return 0;
	}

	redirectToArticleId(id: number) {
		window.location.href = `/article/${id}`;
	}
	redirectToFeedId(id: number) {
		window.location.href = `/feed/${id}`;
	}
	redirectToUrl(url: string) {
		window.location.href = url;
	}
}

