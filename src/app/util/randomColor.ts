import { BOOKMARKS_QUERY_RESPONSE } from '../core/queries/bookmarks';
import { GENERAL_FEED_QUERY_RESPONCE } from '../core/queries/feeds';
import { GENERAL_RECOMMENDATION_QUERY_RESULT } from '../core/queries/recommendation';
import { SINGLE_ARTICLE_QUERY_RESPONSE } from '../core/queries/singleArticle';
import { SUBSCRIPTION_QUERY_RESPONSE } from '../core/queries/subscription';

export const DEFAULT_PASTEL_COLOR = 'var(--pastel-a-color)';
/**
 * @author Amos Gross
 * @summary fetches color for article
 * @description preliminary solution for generating colored articles
 * @returns {string} css color
 */
export function generateRandomColor(colorSeed: number): string {
	switch (colorSeed % 4) {
		case 0:
			return 'var(--pastel-a-color)';
		case 1:
			return 'var(--pastel-b-color)';
		case 2:
			return 'var(--pastel-c-color)';
		case 3:
			return 'var(--pastel-d-color)';
		default:
			return DEFAULT_PASTEL_COLOR;
	}
}

/**
 * @author Jonas Eppard
 * @summary Get Color Seed for Article
 * @description Get Color Seed for Article default id of first category if no categories present id of article
 * @param {SINGLE_ARTICLE_QUERY_RESPONSE["similarArticles"]} article - article to get seed from. Needs id an categories (can be empty list)
 * @returns {number} - Seed for color
 */
export function getColorSeedFromArticle(article: { categories?: { id: number }[]; id: number }): number {
	if (article.categories && article.categories.length > 0) {
		return article.categories[0].id;
	}
	return article.id;
}
