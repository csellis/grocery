import { useHotkeys } from "react-hotkeys-hook";
import { useMutation } from "@redwoodjs/web";
import { useState } from "react";


export const QUERY = gql`
  query ItemSearchQuery($name: String!) {
    itemsByName(name: $name) {
      id
      name
      category {
        name
      }
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
    createItemAndUserItem(input: $input) {
      id
    }
  }
`

// export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ itemsByName, setQuery, name }) => {
  const [selectedUserItem, setSelectedUserItem] = useState(0)

  const [create] = useMutation(SAVE_USER_ITEM, {
    refetchQueries: ["UserItemsQuery"]
  })

  const [createItemAndUserItem] = useMutation(CREATE_NEW_ITEM, {
    refetchQueries: ["UserItemsQuery"]
  });

  // Create a new Item, then Add item
  const createNewItem = (e) => {
    e.preventDefault();
    const newItemName = upperCaseQuery();
    createItemAndUserItem({
      variables: {
        input: {
          name: newItemName
        }
      }
    })
    setQuery("")
  }

  // Add an existing Item
  const itemSelect = (e, item) => {
    e.preventDefault();
    create({ variables: { input: { id: item.id } } })
    setQuery("")
    // console.log(item)
  }

  useHotkeys('*', (event, handler) => {
    // console.log(event)
    const { key, ctrlKey } = event;

    if (key === "Enter" && ctrlKey) {
      // Adding new item while current items shown
      // console.log('Adding new item while current items shown')
      createNewItem(event);
      setQuery("")
    } else if (key === "ArrowDown") {
      const max = itemsByName.length - 1;
      setSelectedUserItem(selectedUserItem => {
        return selectedUserItem < max ? selectedUserItem + 1 : max;
      })
    } else if (key === "ArrowUp") {
      setSelectedUserItem(selectedUserItem => {
        return selectedUserItem > 0 ? selectedUserItem - 1 : 0;
      })
    } else if (key === "Enter") {
      if (itemsByName.length !== 0) {
        // console.log('Adding existing item')
        const item = itemsByName[selectedUserItem];
        create({ variables: { input: { id: item.id } } })
        setQuery("")
      } else {
        // console.log('Adding new item')
        createNewItem(event);
        setQuery("")
      }
    } else {
      // console.log(key);
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

  return (
    <div className="absolute w-3/4 mt-16 ml-8 py-2 bg-white shadow-xl rounded-lg">
      {
        itemsByName.map((item, i) => {
          return <a
            href="#"
            onClick={(e) => itemSelect(e, item)}
            className={`${selectedUserItem === i ? 'bg-indigo-700 text-white' : ''} flex justify-between px-4 py-2 hover:bg-indigo-700 hover:text-white`}
            key={item.id}>
            <span>
              {item.name}
            </span>
            <span className="text-gray-400">
              {item.category.name}
            </span>
          </a>
        })
      }
      <a onClick={(e) => createNewItem(e)} className={`px-4 py-2 hover:bg-indigo-700 hover:text-white border-t border-gray-300 flex justify-between`}>
        <span>
          Add <span className="font-bold">{upperCaseQuery()}</span>
        </span>
        <span className="text-gray-400">Ctrl + Enter</span>
      </a>
    </div >
  )
}

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