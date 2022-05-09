import { gql } from 'apollo-angular';
import { PaginationArg } from 'src/app/models/paginationArg.model';

export type SUBSCRIPTION_QUERY_RESPONSE = {
	subscriptions: {
		id: number;
		name: string;
		link: string;
		ttl: number;
		description: string;
		lastPolledAt: string;
		articles: {
			id: number;
			title: string;
			description: string;
			url: string;
			content: string;
			publishedAt: string;
			categories: { id: number }[];
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
			ttl
			description
			lastPolledAt
			articles(PaginationArg: $PaginationArg, Desc: $desc) {
				id
				title
				description
				content
				url
				publishedAt
				categories {
					id
				}
			}
		}
	}
`;
