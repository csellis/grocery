import { Link, routes } from '@redwoodjs/router'
import { useEffect } from "react";

export const QUERY = gql`
  query STORES {
    stores {
      id
      name
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

export const Success = (props) => {
  const { stores, selectedStore, setSelectedStore } = props

  return (
    <div className="mb-4">
      <label htmlFor="stores" className="block text-sm leading-5 font-medium text-gray-700 sr-only">Stores</label>
      <select
        onChange={(e) => setSelectedStore(e.currentTarget.value)}
        defaultValue={selectedStore}
        id="stores"
        className="text-xl bg-white shadow-lg px-4 py-2 rounded mt-1 form-select block w-full pl-3 pr-10 leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
        {stores.map(store => {
          return <option className="text-gray-800" key={store.id} value={store.id}>{store.name}</option>
        })}
      </select>
    </div>
  )

}
