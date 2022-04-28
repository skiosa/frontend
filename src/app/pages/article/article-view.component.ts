import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
    SINGLE_ARTICLE_QUERY,
    SINGLE_ARTICLE_QUERY_RESPONSE,
} from 'src/app/core/queries/singleArticle';

import { PartialExcept } from 'src/app/util/types';
import { Feed, Article } from 'skiosa-orm';

@Component({
    selector: 'app-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.css'],
})
export class ArticleViewComponent implements OnInit {
    public article: PartialExcept<Article, 'title' | 'content' | 'url'> & { feed: PartialExcept<Feed, 'id'> } = {
        title: 'Loading...',
        content: 'Loading...',
        url: '',
        feed: {
            id: -1,
        }
    };
    public recommendedArticles: (PartialExcept<Article, 'title' | 'description' | 'id'> & { categories: { id: number, name?: string }[] })[] = [];

    constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) { }

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
    /**
     * @author Jonas Eppard
     * @summary Get Color Seed for Article
     * @description Get Color Seed for Article default id of first category if no categories present id of article
     * @param {PartialExcept<Article, 'id'> & {categories: {id: number, name?:string}}} article - article to get seed from. Needs id an categories (can be empty list)
     * @returns {number} - Seed for color
     */
    getColorSeed(article: PartialExcept<Article, 'id'> & { categories?: { id: number, name?: string }[] }): number {
        if (article.categories) {
            return article.categories[0].id;
        }
        return article.id;
    }

    redirectToArticleId(id: number) {
        this.router.navigate(['/article', 'id'])
    }
    redirectToFeedId(id: number) {
        this.router.navigate(['/feed', 'id'])
    }
    redirectToUrl(url: string) {
        this.router.navigate([url])
    }
}

