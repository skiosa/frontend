import { gql } from 'apollo-angular';

export type SINGLE_ARTICLE_QUERY_RESPONSE = {
	article: {
		title: string;
		content: string;
		url: string;
		feed: { id: number };
	};
	similarArticles: {
		id: number;
		title: string;
		categories: { id: number }[];
		description: string;
	}[];
};

export const SINGLE_ARTICLE_QUERY = gql<SINGLE_ARTICLE_QUERY_RESPONSE, { articleId: number }>`
	query ExampleQuery($articleId: Float!) {
		article(id: $articleId) {
			title
			content
			url
			feed {
				id
			}
		}
		similarArticles(articleId: $articleId) {
			id
			title
			categories {
				id
			}
			description
		}
	}
`;
