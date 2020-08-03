import Category from 'src/components/Category'

export const QUERY = gql`
  query FIND_CATEGORY_BY_ID($id: Int!) {
    category: category(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Category not found</div>

export const Success = ({ category }) => {
  return <Category category={category} />
}
