import { gql } from 'apollo-angular';
import { PaginationArg } from '../../models/paginationArg.model';

export type GENERAL_RECOMMENDATION_QUERY_RESULT = {
	recommendedArticles: {
		id: number;
		title: string;
		description: string;
		url: string;
		categories: { id: number }[];
		likeStatus: boolean;
	}[];
};

export const GENERAL_RECOMMENDATION_QUERY = gql<
	GENERAL_RECOMMENDATION_QUERY_RESULT,
	{ seed: number; PaginationArg: PaginationArg }
>`
	query recommendedArticles($seed: Float!, $PaginationArg: PaginationArg!) {
		recommendedArticles(seed: $seed, PaginationArg: $PaginationArg) {
			id
			title
			description
			url
			categories {
				id
			}
			likeStatus
		}
	}
`;
