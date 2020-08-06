export const QUERY = gql`
  query StoresQuery {
    stores {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ stores }) => {
  return JSON.stringify(stores)
}
