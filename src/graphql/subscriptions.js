/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFromToMessages = /* GraphQL */ `
  subscription OnCreateFromToMessages(
    $id: ID
    $from: String
    $to: String
    $messages: String
  ) {
    onCreateFromToMessages(id: $id, from: $from, to: $to, messages: $messages) {
      id
      from
      to
      messages
    }
  }
`;
export const onUpdateFromToMessages = /* GraphQL */ `
  subscription OnUpdateFromToMessages(
    $id: ID
    $from: String
    $to: String
    $messages: String
  ) {
    onUpdateFromToMessages(id: $id, from: $from, to: $to, messages: $messages) {
      id
      from
      to
      messages
    }
  }
`;
export const onDeleteFromToMessages = /* GraphQL */ `
  subscription OnDeleteFromToMessages(
    $id: ID
    $from: String
    $to: String
    $messages: String
  ) {
    onDeleteFromToMessages(id: $id, from: $from, to: $to, messages: $messages) {
      id
      from
      to
      messages
    }
  }
`;
