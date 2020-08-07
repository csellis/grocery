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

const DELETE_STORE_MUTATION = gql`
  mutation DeleteStoreMutation($id: Int!) {
    deleteStore(id: $id) {
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

  const [deleteStore] = useMutation(DELETE_STORE_MUTATION, {
    onCompleted: () => {
      navigate(routes.stores())
      addMessage('Store deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    updateStore({ variables: { id, input } })
  }

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete store ' + id + '?')) {
      deleteStore({ variables: { id } })
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl text-gray-800">Edit Store</h2>
        <button
          onClick={() => onDeleteClick(store.id)}
          className="py-2 px-4 text-white bg-red-700 hover:bg-red-600 focus:bg-redred-500 rounded-lg shadow-md"
        >
          Delete Store
        </button>
      </div>
      <div className="rw-segment-main">
        <StoreForm
          store={store}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div >
  )
}
