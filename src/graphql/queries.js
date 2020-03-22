/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFromToMessage = `query GetFromToMessage($id: ID!, $from: String!) {
  getFromToMessage(id: $id, from: $from) {
    id
    from
    to
    message
  }
}
`;
export const listFromToMessages = `query ListFromToMessages(
  $filter: TableFromToMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listFromToMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      from
      to
      message
    }
    nextToken
  }
}
`;
