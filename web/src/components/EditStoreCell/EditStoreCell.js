export const QUERY = gql`
  query EditStoreCellQuery {
    editStoreCell {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ editStoreCell }) => {
  return JSON.stringify(editStoreCell)
}
