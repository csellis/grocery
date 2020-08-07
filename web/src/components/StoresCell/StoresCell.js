import { Link, routes } from '@redwoodjs/router'

import Stores from 'src/components/Stores'

export const QUERY = gql`
  query STORES {
    stores {
      id
      name
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No stores yet. '}
      <Link to={routes.newStore()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ stores }) => {
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl text-gray-800">Stores</h2>
        <Link className="py-2 px-4 text-white bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-500 rounded-lg shadow-md" to={routes.newStore()}>Create Store &raquo;</Link>
      </div>
      <Stores stores={stores} />
    </div>
  )

}
