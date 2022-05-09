import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { KeycloakService } from 'keycloak-angular';
import { GENERAL_ARTIKLE_LIKE_MUTATION } from 'src/app/core/mutations/likes';
import { SINGLE_ARTICLE_QUERY, SINGLE_ARTICLE_QUERY_RESPONSE } from 'src/app/core/queries/singleArticle';
import { getColorSeedFromArticle } from 'src/app/util/randomColor';

@Component({
	selector: 'app-article-view',
	templateUrl: './article-view.component.html',
	styleUrls: ['./article-view.component.css'],
})
export class ArticleViewComponent implements OnInit {
	public article: SINGLE_ARTICLE_QUERY_RESPONSE['article'] = {
		id: 0,
		title: 'Loading...',
		description: 'Loading...',
		url: '',
		feed: {
			id: -1,
		},
		likeStatus: false,
	};

	public likeStatus: boolean = false;

	public recommendedArticles: SINGLE_ARTICLE_QUERY_RESPONSE['similarArticles'] = [];

	constructor(
		private route: ActivatedRoute,
		private apollo: Apollo,
		private router: Router,
		private readonly keycloak: KeycloakService
	) {}

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
				this.likeStatus = data.article.likeStatus;
			});
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

	/**
	 * @author Marcel Alex
	 * @summary Changes the Like status of the article
	 * @description Checks if user is logged in and if so, changes the Like status of the article
	 * @param {MouseEvent} event - The mouse event to stop propagation
	 */

	public changeLikeStatus(event: MouseEvent): void {
		event.stopPropagation();
		this.keycloak.isLoggedIn().then((isLoggedIn) => {
			if (!isLoggedIn) {
				this.keycloak.login();
			}
			this.apollo
				.mutate({
					mutation: GENERAL_ARTIKLE_LIKE_MUTATION,
					variables: {
						articleId: this.article.id,
						isLiked: !this.likeStatus,
					},
				})
				.subscribe((data) => {
					this.likeStatus = data.data?.changeLike ?? this.likeStatus;
				});
		});
	}

	/**
	 * @author Amos Gross
	 * @summary Copy current link to clipboard
	 * @description Copies article link to clipboard
	 */
	copyLinkToClipboard() {
		navigator.clipboard.writeText(this.router.url);
	}
	getColorSeed(article: SINGLE_ARTICLE_QUERY_RESPONSE['similarArticles'][0]): number {
		return getColorSeedFromArticle(article);
	}
}
