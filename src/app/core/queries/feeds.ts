import { gql } from 'apollo-angular';

export const GENERAL_FEED_QUERY = gql`
  query recommendedArticles($seed: Float!, $PaginationArg: PaginationArg!) {
    recommendedArticles(seed: $seed, PaginationArg: $PaginationArg) {
      id
      title
      description
      url
    }
  }
`;
