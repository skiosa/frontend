import { gql } from 'apollo-angular';

/**
 * @author Jonas Eppard
 * @summary Change bookmark
 * @description Set the bookmark status of a article
 * @param {number} articleId - The id of the article to change the bookmark status of
 * @param {boolean} isBookmarked - The new bookmark status
 * @returns {Promise<boolean>} - The new bookmark status
 */
export const CHANGE_BOOKMARK_MUTATION = gql<{ changeBookmark: boolean }, { isBookmarked: boolean; articleId: number }>`
	mutation ChangeBookmark($isBookmarked: Boolean!, $articleId: Float!) {
		changeBookmark(isBookmarked: $isBookmarked, articleId: $articleId)
	}
`;
