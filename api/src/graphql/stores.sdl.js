export const schema = gql`
  type Store {
    id: Int!
    name: String!
    user: User!
    userId: String!
    StoreCategory: [StoreCategory]!
  }

  type Query {
    stores: [Store!]!
    store(id: Int): Store!
  }

  input CreateStoreInput {
    name: String!
    userId: String
  }

  input UpdateStoreInput {
    name: String
    userId: String
  }

  type Mutation {
    createStore(input: CreateStoreInput!): Store!
    updateStore(id: Int!, input: UpdateStoreInput!): Store!
    deleteStore(id: Int!): Store!
  }
`
