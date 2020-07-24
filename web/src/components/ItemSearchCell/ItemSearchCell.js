import { useMutation } from "@redwoodjs/web";

export const QUERY = gql`
  query ItemSearchQuery($name: String!) {
    itemsByName(name: $name) {
      name
      id
    }
  }
`

const SAVE_USER_ITEM = gql`
  mutation SaveUserItem($input: CreateUserItemInput) {
    createUserItem(input: $input)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ itemsByName }) => {

  const [create] = useMutation(SAVE_USER_ITEM)

  const itemSelect = (e, item) => {
    e.preventDefault();
    create({ variables: { input: { id: item.id } } })
    // console.log(item)
  }

  return (
    <div className="absolute w-3/4 mt-16 ml-8 py-2 bg-white shadow-xl rounded-lg">
      {itemsByName.map(item => {
        return <a href="#" onClick={(e) => itemSelect(e, item)} className="block px-4 py-2 hover:bg-indigo-700 hover:text-white" key={item.id}>{item.name}</a>
      })}
    </div>
  )
}