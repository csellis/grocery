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
  return (
    <div className="absolute w-3/4 mt-16 ml-8 py-2 bg-white shadow-xl rounded-lg">
      {itemsByName.map(item => {
        return <a href="#" className="block px-4 py-2 hover:bg-indigo-700 hover:text-white" key={item.id}>{item.name}</a>
      })}
    </div>
  )
}