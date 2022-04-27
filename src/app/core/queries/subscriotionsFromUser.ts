import { gql } from 'apollo-angular';

export type GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY_RESPONCE = {
  subscriptions: {
    id: number;
    name: string;
  }[]
}

export const GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY = gql<{ subscriptions: { id: number }[] }, {}>`
query GENERAL_SUBSCRIPTIONS_FROM_USER_QUERY {
  subscriptions {
    id
  }
}
`;

