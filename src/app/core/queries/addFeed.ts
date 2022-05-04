import { gql } from 'apollo-angular';

export const ADD_FEED_MUTATION = gql<{ createFeed: { id: number } }, { feed: { link: string, name: string, ttl?: number, description: string } }>`
mutation Mutation($feed: FeedInput!) {
    createFeed(feed: $feed) {
      id
    }
  }
`;