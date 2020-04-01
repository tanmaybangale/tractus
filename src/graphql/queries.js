/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFromToMessages = /* GraphQL */ `
  query GetFromToMessages($id: ID!, $from: String!) {
    getFromToMessages(id: $id, from: $from) {
      id
      from
      to
      messages
    }
  }
`;
export const listFromToMessages = /* GraphQL */ `
  query ListFromToMessages(
    $filter: TableFromToMessagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFromToMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        from
        to
        messages
      }
      nextToken
    }
  }
`;
export const listToFromMessages = /* GraphQL */ `
  query ListToFromMessages(
    $filter: TableFromToMessagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listToFromMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        from
        to
        messages
      }
      nextToken
    }
  }
`;
export const queryFromToMessagesByIdToIndex = /* GraphQL */ `
  query QueryFromToMessagesByIdToIndex($id: ID!, $first: Int, $after: String) {
    queryFromToMessagesByIdToIndex(id: $id, first: $first, after: $after) {
      items {
        id
        from
        to
        messages
      }
      nextToken
    }
  }
`;
