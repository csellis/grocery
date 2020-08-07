import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes, Link } from '@redwoodjs/router'
import StoreForm from 'src/components/StoreForm'

export const QUERY = gql`
  query FIND_STORE_BY_ID($id: Int!) {
    store: store(id: $id) {
      id
      name
      userId
    }
  }
`
const UPDATE_STORE_MUTATION = gql`
  mutation UpdateStoreMutation($id: Int!, $input: UpdateStoreInput!) {
    updateStore(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ store }) => {
  const { addMessage } = useFlash()
  const [updateStore, { loading, error }] = useMutation(UPDATE_STORE_MUTATION, {
    onCompleted: () => {
      navigate(routes.stores())
      addMessage('Store updated.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    updateStore({ variables: { id, input } })
  }

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl text-gray-800">Edit Store</h2>
      </div>
      <div className="rw-segment-main">
        <StoreForm
          store={store}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
