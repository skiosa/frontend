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

export const SUBSCRIPTION_QUERY = gql<SUBSCRIPTION_QUERY_RESPONSE, { PaginationArg: PaginationArg, Desc: Boolean}>`
	query subscriptions($PaginationArg: PaginationArg!, $Desc: Boolean) {
		subscriptions {
			id
			name
			link
			ttl
			description
			lastPolledAt
			articles(PaginationArg: $PaginationArg, Desc: $Desc) {
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
