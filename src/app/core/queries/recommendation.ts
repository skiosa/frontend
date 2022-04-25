import { gql } from 'apollo-angular';

export const GENERAL_RECOMMENDATION_QUERY = gql`
  query recommendedArticles($seed: Float!, $PaginationArg: PaginationArg!) {
    recommendedArticles(seed: $seed, PaginationArg: $PaginationArg) {
      id
      title
      description
      url
    }
  }
`;
