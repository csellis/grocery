import gql from 'graphql-tag'

export const schema = gql`
  type UserItem {
    id: Int!
    user: User!
    userId: String!
    itemName: String!
    itemId: Int!
    picked: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    userItems: [UserItem!]!
  }

  input CreateUserItemInput {
    userId: String!
    itemName: String!
    itemId: Int!
    picked: Boolean!
  }

  input UpdateUserItemInput {
    userId: String
    itemName: String
    itemId: Int
    picked: Boolean
  }
`
