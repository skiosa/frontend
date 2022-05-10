import { gql } from 'apollo-angular';

export type GENERAL_ARTIKLE_LIKE_MUTATION_RESPONCE = {
	changeLike: boolean;
};

export const GENERAL_ARTIKLE_LIKE_MUTATION = gql<
	GENERAL_ARTIKLE_LIKE_MUTATION_RESPONCE,
	{ articleId: number; isLiked: boolean }
>`
	mutation GENERAL_ARTIKLE_LIKE_MUTATION($isLiked: Boolean!, $articleId: Float!) {
		changeLike(isLiked: $isLiked, articleId: $articleId)
	}
`;
