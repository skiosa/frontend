import { gql } from 'apollo-angular';

export type GENERAL_FEED_SUB_MUTATION_RESPONCE = {
	changeSubscription: boolean;
};

export const GENERAL_FEED_SUB_MUTATION = gql<
	GENERAL_FEED_SUB_MUTATION_RESPONCE,
	{ feedId: number; isSubscribed: boolean }
>`
	mutation GENERAL_FEED_SUB_MUTATION($isSubscribed: Boolean!, $feedId: Float!) {
		changeSubscription(isSubscribed: $isSubscribed, feedId: $feedId)
	}
`;
