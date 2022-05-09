import { gql } from 'apollo-angular';

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

export const SINGLE_ARTICLE_QUERY = gql<SINGLE_ARTICLE_QUERY_RESPONSE, { articleId: number }>`
	query ExampleQuery($articleId: Float!) {
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
		similarArticles(articleId: $articleId) {
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
