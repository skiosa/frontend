import { gql } from 'apollo-angular';
import { PaginationArg } from 'src/app/models/paginationArg.model';

export type SINGLE_ARTICLE_QUERY_RESPONSE = {
	article: {
		id: number;
		title: string;
		description: string;
		url: string;
		feed: { id: number };
		likeStatus: boolean;
	};
	similarArticles: {
		id: number;
		title: string;
		categories: { id: number }[];
		description: string;
		likeStatus: boolean;
	}[];
};

/**
 * @author Jonas Eppard, Lukas Huida
 * @summary query for a single article
 * @description query to fetch an article
 * @param {PaginationArg} paginationArg -  Pagination to limit/paginate the similarArticles of an article
 * @param {number} articleId -  articleId of the article to fetch
 * @returns {SINGLE_ARTICLE_QUERY_RESPONSE} - Single Article with similar Articles
 */
export const SINGLE_ARTICLE_QUERY = gql<
	SINGLE_ARTICLE_QUERY_RESPONSE,
	{ articleId: number; PaginationArg: PaginationArg }
>`
	query article($articleId: Float!, $PaginationArg: PaginationArg!) {
		article(id: $articleId) {
			title
			id
			description
			url
			feed {
				id
			}
			likeStatus
		}
		similarArticles(articleId: $articleId, PaginationArg: $PaginationArg) {
			id
			title
			categories {
				id
			}
			description
			likeStatus
		}
	}
`;
