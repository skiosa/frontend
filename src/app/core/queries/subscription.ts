import { gql } from 'apollo-angular';

export type SUBSCRIPTION_QUERY_RESPONSE = {
  subscriptions: {
    id: number,
    name: string,
    link: string,
    ttl: number,
    description: string,
    lastPolledAt: string,
    articles: {
      id: number,
      title: string,
      description: string,
      url: string,
      content: string,
      publishedAt: string,
    }[]
  }[]
}

export const SUBSCRIPTION_QUERY = gql<SUBSCRIPTION_QUERY_RESPONSE, {}>`
  query subscriptions {
    subscriptions {
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
