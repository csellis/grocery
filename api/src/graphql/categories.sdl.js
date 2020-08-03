import gql from 'graphql-tag'

export const schema = gql`
  type Category {
    id: Int!
    name: String!
    items: [Item]!
  }

  type Query {
    categories: [Category!]!
    category(id: Int!): Category!
  }

  input CreateCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(id: Int!, input: UpdateCategoryInput!): Category!
    deleteCategory(id: Int!): Category!
  }
`
