import { gql } from 'apollo-angular';

export type GENERAL_FEED_QUERY_RESPONCE = {
	feed: {
		id: number;
		link: string;
		name: string;
		description: string;
		articles: {
			id: number;
			title: string;
			description: string;
			publishedAt: string;
			categories: {
				id: number;
			}[];
			likeStatus: boolean;
			bookmarkStatus: boolean;
		}[];
	};
};

/**
 * @author Marcel Alex, Lukas Huida
 * @summary query for feeds
 * @description query to a feed and its articles
 * @param {PaginationArg} paginationArg -  Pagination to limit/paginate the articles of an feed
 * @param {number} feedId - feedId to fetch the selected feed
 * @param {boolean} desc - Descending order of articles by the publishedAt Date
 * @returns {GENERAL_FEED_QUERY_RESPONCE} - Feed which contains the articles of the feed and the feed itself
 */
export const GENERAL_FEED_QUERY = gql<GENERAL_FEED_QUERY_RESPONCE, { feedId: number; desc: boolean }>`
	query GENERAL_FEED_QUERY($feedId: Float!, $desc: Boolean) {
		feed(id: $feedId) {
			id
			link
			name
			description
			articles(Desc: $desc) {
				id
				title
				description
				publishedAt
				categories {
					id
				}
				likeStatus
				bookmarkStatus
			}
		}
	}
`;
