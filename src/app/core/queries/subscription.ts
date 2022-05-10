import { gql } from 'apollo-angular';
import { PaginationArg } from 'src/app/models/paginationArg.model';

export type SUBSCRIPTION_QUERY_RESPONSE = {
	subscriptions: {
		id: number;
		name: string;
		link: string;
		description: string;
		articles: {
			id: number;
			title: string;
			description: string;
			url: string;
			categories: { id: number }[];
			likeStatus: boolean;
			bookmarkStatus: boolean;
		}[];
	}[];
};

/**
 * @author Amos Gross, Lukas Huida
 * @summary query for user subscriptions
 * @description query to fetch all subscriptions of a user
 * @param {PaginationArg} paginationArg -  Pagination to limit/paginate the articles of an feed-subscription
 * @param {boolean} desc - Descending order of articles by the publishedAt Date
 * @returns {SUBSCRIPTION_QUERY_RESPONSE} - Subscriptions of the user which contains the subscribed feeds and their articles
 */
export const SUBSCRIPTION_QUERY = gql<SUBSCRIPTION_QUERY_RESPONSE, { PaginationArg: PaginationArg; desc: boolean }>`
	query subscriptions($PaginationArg: PaginationArg!, $desc: Boolean) {
		subscriptions {
			id
			name
			link
			description
			articles(PaginationArg: $PaginationArg, Desc: $desc) {
				id
				title
				description
				url
				categories {
					id
				}
				likeStatus
				bookmarkStatus
			}
		}
	}
`;
