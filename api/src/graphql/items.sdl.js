import gql from 'graphql-tag'

export const schema = gql`
  type Item {
    id: Int!
    name: String!
    published: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    users: [ItemsOnUser]!
  }

  type ItemsOnUser {
    item: Item
    itemId: Int
    user: User
    userId: String
    picked: Boolean
  }

  type Query {
    items: [Item!]!
    itemsByName(name: String!): [Item!]!
    item(id: Int!): Item!
  }

  input CreateItemInput {
    name: String!
    published: Boolean!
  }

  input UpdateItemInput {
    name: String
    published: Boolean
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item!
    updateItem(id: Int!, input: UpdateItemInput!): Item!
    deleteItem(id: Int!): Item!
  }
`
