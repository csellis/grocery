export const schema = gql`
  type StoreCategory {
    id: Int!
    order: Int!
    categoryName: String!
    categoryId: Int!
    store: Store!
    storeId: Int!
  }

  type Query {
    storeCategories: [StoreCategory!]!
    storeCategory(id: Int!): StoreCategory!
  }

  input CreateStoreCategoryInput {
    order: Int!
    categoryName: String!
    categoryId: Int!
    storeId: Int!
  }

  input UpdateStoreCategoryInput {
    order: Int
    categoryName: String
    categoryId: Int
    storeId: Int
  }

  type Mutation {
    createStoreCategory(input: CreateStoreCategoryInput!): StoreCategory!
    updateStoreCategory(
      id: Int!
      input: UpdateStoreCategoryInput!
    ): StoreCategory!
    deleteStoreCategory(id: Int!): StoreCategory!
  }
`
