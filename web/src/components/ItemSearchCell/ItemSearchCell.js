import { useHotkeys } from "react-hotkeys-hook";
import { useMutation } from "@redwoodjs/web";
import { useState } from "react";


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
  const [selectedUserItem, setSelectedUserItem] = useState(0)


  const [create] = useMutation(SAVE_USER_ITEM, {
    refetchQueries: ["UserItemsQuery"]
  })

  const itemSelect = (e, item) => {
    e.preventDefault();
    create({ variables: { input: { id: item.id } } })
    // console.log(item)
  }


  useHotkeys('*', (event, handler) => {
    // console.log(event)
    switch (event.key) {
      case "ArrowDown":
        setSelectedUserItem(selectedUserItem => selectedUserItem + 1)
        break;
      case "ArrowUp":
        setSelectedUserItem(selectedUserItem => selectedUserItem - 1)
        break;
      case "Tab":
        event.preventDefault() // may be contentious
        setSelectedUserItem(selectedUserItem => selectedUserItem + 1)
        break;
      default:
        console.log(event.key)
        break;
    }
  }, {
    filter: () => true
  });

  return (
    <div className="absolute w-3/4 mt-16 ml-8 py-2 bg-white shadow-xl rounded-lg">
      <h1>{selectedUserItem}</h1>
      {itemsByName.map((item, i) => {
        return <a
          href="#"
          onClick={(e) => itemSelect(e, item)}
          className={`${selectedUserItem === i ? 'bg-indigo-500' : ''} block px-4 py-2 hover:bg-indigo-700 hover:text-white`}
          key={item.id}>
          {item.name}
        </a>
      })}
    </div>
  )
}