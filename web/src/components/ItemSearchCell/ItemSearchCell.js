import {
  useMutation
} from '@redwoodjs/web'

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

  const [create] = useMutation(SAVE_USER_ITEM);

  const onItemSelect = (e, item) => {
    e.preventDefault();
    console.log(item)
    create({ variables: { input: { id: item.id } } })
    // console.log(id)
  }

  return (
    <div className="absolute w-3/4 mt-16 ml-8 py-2 bg-white shadow-xl rounded-lg">
      {itemsByName.map(item => {
        return <a href="#" onClick={(e) => onItemSelect(e, item)} className="block px-4 py-2 hover:bg-indigo-700 hover:text-white" key={item.id}>{item.name}</a>
      })}
    </div>
  )
}