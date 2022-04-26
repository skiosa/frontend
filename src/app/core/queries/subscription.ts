import { gql } from 'apollo-angular';

export const SUBSCRIPTION_QUERY = gql`
  query subscriptions {
    feeds {
      id
      name
      link
      ttl
      description
      lastPolledAt
      articles {
        id
        title
        description
        content
        url
        publishedAt
      }
    }
  }
`;
