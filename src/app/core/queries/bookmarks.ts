import { gql } from 'apollo-angular';
import { PaginationArg } from 'src/app/models/paginationArg.model';

export type BOOKMARKS_QUERY_RESPONSE = {
	bookmarks: {
		id: number;
		title: string;
		description: string;
		url: string;
		categories: { id: number }[];
	}[];
};

export const BOOKMARKS_QUERY = gql<BOOKMARKS_QUERY_RESPONSE, { PaginationArg: PaginationArg }>`
	query bookmarks($PaginationArg: PaginationArg!) {
		bookmarks(PaginationArg: $PaginationArg) {
			id
			title
			description
			url
			categories {
				id
			}
		}
	}
`;
