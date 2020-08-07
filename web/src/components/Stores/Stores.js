import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_STORE_MUTATION = gql`
  mutation DeleteStoreMutation($id: Int!) {
    deleteStore(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const StoresList = ({ stores }) => {
  const { addMessage } = useFlash()
  const [deleteStore] = useMutation(DELETE_STORE_MUTATION, {
    onCompleted: () => {
      addMessage('Store deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete store ' + id + '?')) {
      deleteStore({ variables: { id }, refetchQueries: ['STORES'] })
    }
  }

  return (
    <div>
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stores.map((store, index) => {

          const initials = () => {
            return store.name.slice(0, 2);
          }

          const colors = ["bg-purple-600", "bg-pink-600", "bg-orange-500", "bg-green-400"]
          const determineColor = colors[index % 4];
          return (
            <li key={store.id} className="col-span-1 flex shadow-sm rounded-md">
              <div className={`${determineColor} flex-shrink-0 flex items-center justify-center w-16 text-white text-sm leading-5 font-medium rounded-l-md`}>
                {initials()}
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-4 text-sm leading-5 truncate">
                  <Link to={routes.editStore({ id: store.id })} className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">{store.name}</Link>
                </div>
              </div>
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}

export default StoresList
