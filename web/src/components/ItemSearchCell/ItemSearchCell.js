export const QUERY = gql`
  query ItemSearchQuery($name: String!) {
    itemsByName(name: $name) {
      name
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ itemsByName }) => {
  return JSON.stringify(itemsByName)
}
