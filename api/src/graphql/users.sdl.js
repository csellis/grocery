import gql from 'graphql-tag'

export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    items: [UserItem]!
  }

  type Query {
    users: [User!]!
  }

  input CreateUserInput {
    email: String!
    name: String
  }

  input UpdateUserInput {
    email: String
    name: String
  }
`
