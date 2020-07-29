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

const CREATE_NEW_ITEM = gql`
  mutation CreateNewItem($input: CreateItemInput) {
    createItem(input: $input)
  }
`

export const Loading = () => <div>Loading...</div>

// export const Empty = () => {

//   return (
//     <div className="absolute w-3/4 mt-16 ml-8 py-2 bg-white shadow-xl rounded-lg">
//       <a
//         href="#"
//         onClick={(e) => itemSelect(e, item)}
//         className={`block px-4 py-2 hover:bg-indigo-700 hover:text-white`}
//       >
//         Empty
//       </a>
//     </div>
//   )
// }

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ itemsByName, setQuery, name }) => {
  const [selectedUserItem, setSelectedUserItem] = useState(0)

  const [create] = useMutation(SAVE_USER_ITEM, {
    refetchQueries: ["UserItemsQuery"]
  })

  const [createItem] = useMutation(CREATE_NEW_ITEM);

  const itemSelect = (e, item) => {
    e.preventDefault();
    create({ variables: { input: { id: item.id } } })
    setQuery("")
    // console.log(item)
  }

  useHotkeys('*', (event, handler) => {
    // console.log(event)
    switch (event.key) {
      case "ArrowDown":
        const max = itemsByName.length - 1;
        setSelectedUserItem(selectedUserItem => {
          return selectedUserItem < max ? selectedUserItem + 1 : max;
        })
        break;
      case "ArrowUp":
        setSelectedUserItem(selectedUserItem => {
          return selectedUserItem > 0 ? selectedUserItem - 1 : 0;
        })
        break;
      case "Enter":
        const item = itemsByName[selectedUserItem];
        create({ variables: { input: { id: item.id } } })
        setQuery("")
        break;
      case "Tab":
        event.preventDefault() // may be contentious
        setSelectedUserItem(selectedUserItem => selectedUserItem + 1)
        break;
      default:
        // console.log(event.key)
        break;
    }
  }, {
    filter: () => true
  }, [
    selectedUserItem, setSelectedUserItem, setQuery
  ]);

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const upperCaseQuery = () => {
    return name.split(" ").map(word => capitalize(word)).join(" ")
  }

  const createNewItem = (e, newItemName) => {
    e.preventDefault();
    createItem({
      variables: {
        input: {
          name: newItemName,
          published: true
        }
      }
    })
  }

  return (
    <div className="absolute w-3/4 mt-16 ml-8 py-2 bg-white shadow-xl rounded-lg">
      {
        itemsByName.length > 0 ?
          itemsByName.map((item, i) => {
            return <a
              href="#"
              onClick={(e) => itemSelect(e, item)}
              className={`${selectedUserItem === i ? 'bg-indigo-700' : ''} block px-4 py-2 hover:bg-indigo-700 hover:text-white`}
              key={item.id}>
              {item.name}
            </a>
          }) :
          <a onClick={(e) => createNewItem(e, upperCaseQuery())} className={`block px-4 py-2 hover:bg-indigo-700 hover:text-white`}>
            Add <span className="font-bold">{upperCaseQuery()}</span>
          </a>
      }
    </div>
  )
}