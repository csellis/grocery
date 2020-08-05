import { useMutation } from "@redwoodjs/web";
import { useState, useRef, useEffect } from 'react'

import Downshift from "downshift";

export const QUERY = gql`
  query UserItemsQuery {
    userItems {
      id
      itemName
      categoryName
    }

    categories {
      id
      name
    }
  }
`

const DELETE_USER_ITEM = gql`
  mutation DeleteUserItem($input: DeleteUserItemInput!) {
    deleteUserItem(input: $input)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ userItems, categories }) => {

  const [deleteUserItem] = useMutation(DELETE_USER_ITEM, {
    refetchQueries: ["UserItemsQuery"]
  })

  const handleCancelClick = (e, userItemId) => {
    e.preventDefault();
    // console.log(userItemId)
    deleteUserItem({
      variables: {
        input: {
          userItemId
        }
      }
    })
  }

  const uncategorizedUserItems = () => {
    const uncat = userItems.filter((userItem) => {
      return userItem.categoryName === "Uncategorized"
    })
    // console.log(uncat)
    return uncat;
  }

  const categorizedUserItems = () => {
    return userItems.filter((userItem) => {
      return userItem.categoryName !== "Uncategorized"
    })
  }


  return (
    <div className="flex flex-col">
      <UserItemsTable
        handleCancelClick={handleCancelClick}
        userItems={uncategorizedUserItems()}
        title="Uncategorized Items"
        headerColor="bg-red-200"
        showCategory={false}
        categories={categories}
      />

      <UserItemsTable
        handleCancelClick={handleCancelClick}
        userItems={categorizedUserItems()}
        title="Grocery List"
        headerColor="bg-gray-200"
        showCategory={true}
        categories={categories}
      />

    </div>
  )
}




const UserItemsTable = ({ userItems, title, headerColor = "bg-gray-200", handleCancelClick, showCategory = true, categories }) => {
  const [selectedUserItem, setSelectedUserItem] = useState()

  const handleUserItemClick = (userItem) => {
    setSelectedUserItem(() => userItem)
  }

  return (
    <div className="-my-2 py-2 mt-4 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow  sm:rounded-lg border-b border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className={`${headerColor} px-6 py-3 border-b border-red-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider`}>
                {title}
              </th>
            </tr>
          </thead>
          <tbody>
            {userItems.map(userItem => {
              return (
                <tr className="bg-white" key={userItem.id} onClick={() => handleUserItemClick(userItem)}>
                  <td className="flex justify-between px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                    <span className="">
                      {userItem.itemName}
                    </span>
                    <div className="flex items-center justify-center">
                      {showCategory ? (
                        <span className="text-gray-400">
                          {userItem.categoryName}
                        </span>
                      ) : ""}
                      <a href="#" className="pl-4" onClick={(e) => handleCancelClick(e, userItem.id)}>
                        <svg fill="none" className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                      </a>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {selectedUserItem &&
        <SelectedUserItem selectedUserItem={selectedUserItem} setSelectedUserItem={setSelectedUserItem} categories={categories} />
      }
    </div>
  )
}

const SelectedUserItem = ({ selectedUserItem, setSelectedUserItem, categories }) => {
  const [categoryFilter, setCategoryFilter] = useState("")
  const modalInput = useRef()

  useEffect(() => {
    modalInput.current.focus();
  }, [])

  const handleClearModal = () => {
    setSelectedUserItem(() => null)
  }

  const onChange = selectedCategory => {
    alert(`your favourite category is ${selectedCategory.name}`);

  };


  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      {/* <!--
    Background overlay, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
      <div onClick={handleClearModal} className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  --> */}
      <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
          <button onClick={handleClearModal} type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" aria-label="Close">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Update <span className="">{selectedUserItem.itemName}</span>?
            </h3>
          </div>
        </div>


        <div className="mt-5 sm:flex sm:items-center">
          <div className="max-w-xs w-full sm:ml-4">
            <Downshift
              onChange={onChange}
              itemToString={categories => (categories ? categories.name : "")}
              resultCount={5}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                highlightedItem,
                getLabelProps,
              }) => (
                  <div>
                    <label
                      className="sr-only"
                      style={{ marginTop: "1rem", display: "block" }}
                      {...getLabelProps()}
                    >
                      Choose your category
                    </label>
                    <br />
                    <input ref={modalInput} className="px-4 py-2" {...getInputProps({ placeholder: "Search Categories" })} />
                    {isOpen ? (
                      <div className="downshift-dropdown absolute bg-white mt-2 py-2 rounded shadow-lg">
                        {categories
                          .filter(
                            item =>
                              !inputValue ||
                              item.name.toLowerCase().includes(inputValue.toLowerCase())
                          )
                          .map((item, index) => {
                            const limit = 5;
                            return index < limit && inputValue ? (
                              <div
                                className="dropdown-item py-2 px-4"
                                {...getItemProps({ key: item.name, index, item })}
                                style={{
                                  backgroundColor:
                                    highlightedIndex === index ? "lightgray" : "white",
                                  fontWeight: selectedItem === item ? "bold" : "normal"
                                }}
                              >
                                {item.name}
                              </div>
                            ) : null
                          }

                          )}
                      </div>
                    ) : null}
                  </div>
                )}
            </Downshift>
          </div>
        </div>


        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Save
            </button>
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button onClick={handleClearModal} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div >
  )
}