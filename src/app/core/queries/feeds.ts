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
      }[]
    }[]
  }
}
export const GENERAL_FEED_QUERY = gql<GENERAL_FEED_QUERY_RESPONCE, {feedId: number}>`
query GENERAL_FEED_QUERY($feedId: Float!) {
    feed(id: $feedId) {
      id
      link
      name
      description
      articles {
        id
        title
        description
        publishedAt
        categories {
          id
        }
      }
    }
  }
`;
