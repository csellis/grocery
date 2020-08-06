export const schema = gql`
  type StoreCategory {
    id: Int!
    order: Int!
    category: Category!
    categoryId: Int!
    store: Store!
    storeId: Int!
  }

  type Query {
    storeCategories: [StoreCategory!]!
  }

  input CreateStoreCategoryInput {
    order: Int!
    categoryId: Int!
    storeId: Int!
  }

  input UpdateStoreCategoryInput {
    order: Int
    categoryId: Int
    storeId: Int
  }
`
