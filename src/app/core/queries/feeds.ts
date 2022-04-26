import { gql } from 'apollo-angular';

export const GENERAL_FEED_QUERY = gql`
query ExampleQuery($feedId: Float!) {
    feed(id: $feedId) {
      link
      name
      articles {
        id
        title
        description
        publishedAt
      }
    }
  }
}
`;
