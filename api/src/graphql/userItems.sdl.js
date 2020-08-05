import gql from 'graphql-tag'

export const schema = gql`
  type UserItem {
    id: Int!
    user: User!
    userId: String!
    categoryName: String!
    cateogoryId: Int!
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
    id: Int
  }

  input DeleteUserItemInput {
    userItemId: Int
  }


  input CategorizeUserItemId {
    userItemId: Int
    categoryId: Int
  }

  input UpdateUserItemInput {
    userId: String
    itemName: String
    itemId: Int
    picked: Boolean
  }

  type Mutation {
    createUserItem(input: CreateUserItemInput): ID
    deleteUserItem(input: DeleteUserItemInput!): ID
    categorizeItem(input: CategorizeUserItemId!): ID
  }
`
