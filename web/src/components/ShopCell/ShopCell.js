import { useMutation } from "@redwoodjs/web";
import { useState, useRef, useEffect } from 'react'

import Downshift from "downshift";
import uniqBy from "lodash/uniqBy";
import { filter } from "lodash";


const PICK_ITEM = gql`
  mutation PickItem($input: UpdateUserItemInput) {
    updateUserItem(input: $input)
  }
`

const CHECK_OUT = gql`
mutation CheckOut($input: CheckOutInput!) {
  checkOutList(input: $input)
}
`


export const QUERY = gql`
  query ShopQuery($selectedStore: Int) {
    userItems {
      id
      itemName
      categoryName
      categoryId
      picked
    }

    store(id: $selectedStore) {
      name
      StoreCategory {
        id
        order
        categoryName
        categoryId
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ userItems, selectedStore, store }) => {
  const [updateUserItem] = useMutation(PICK_ITEM, {
    refetchQueries: ["ShopQuery"]
  })

  const [checkOutList] = useMutation(CHECK_OUT, {
    refetchQueries: ["ShopQuery"]
  })
  // Set defaults of virtual list, set used to remove duplicates
  // filteredList is the list with Items not currently picked and sorted by
  // category order for the store
  const filteredList = []
  const pickedList = []
  let categorySet = new Set()

  // Sort incoming categories
  const sorted = store.StoreCategory.sort((a, z) => {
    return a.order - z.order
  })

  // Iterate over categories pulling out categories not in user's grocery list
  sorted.forEach(storeCategory => {
    userItems.forEach(userItem => {

      if (storeCategory.categoryId === userItem.categoryId) {
        if (userItem.picked) {
          return pickedList.push({ ...userItem, order: storeCategory.order })
        }
        filteredList.push({ ...userItem, order: storeCategory.order })
        categorySet.add(storeCategory)
      }
    })
  })

  // convert set to array
  const keys = [...categorySet]

  // create onclick handler
  // mutation

  const handleUserItemClick = (userItem) => {
    // console.log(userItem)
    updateUserItem({
      variables: {
        input: {
          id: userItem.id,
          picked: !userItem.picked
        }
      }
    })
  }

  const handleCheckOut = () => {
    // console.log('checkout')
    checkOutList({
      variables: {
        input: {
          id: 1
        }
      }
    })
  }

  return (
    <div className="sm:px-4">
      <ul className="mb-4 bg-white shadow rounded">
        {keys.map((category) => {
          const categoryItems = filteredList.filter((listItem) => {
            return listItem.categoryId === parseInt(category.categoryId)
          })

          // Determines header class on userItems
          const headerClass = category.categoryName === "Uncategorized" ? "bg-red-300" : "bg-blue-300";

          return (
            <React.Fragment key={category.id}>
              <li className={`${headerClass} border-b cursor-pointer border-gray-200 px-4 py-2 flex justify-between`}>
                {category.categoryName}
              </li>
              {categoryItems.map(categoryItem => {
                return (
                  <li
                    onClick={() => handleUserItemClick(categoryItem)}
                    className={`border-b hover:bg-gray-200 cursor-pointer border-gray-200 px-4 py-2 flex justify-between`}
                    key={categoryItem.id}>
                    <span>
                      {categoryItem.itemName}
                    </span>

                  </li>
                )
              })}
            </React.Fragment>
          )
        })}
      </ul>

      <PickedTable pickedList={pickedList} handleUserItemClick={handleUserItemClick} />

      <div className="flex justify-between">
        <div></div>
        <button onClick={handleCheckOut} className="px-4 py-2 rounded shadow hover:bg-green-500 focus:bg-green-300 bg-green-400">Check Out</button>
      </div>
    </div>
  )
}


export const PickedTable = ({ pickedList, handleUserItemClick }) => {
  const pickedListLength = pickedList.length;

  return (
    <div>
      {
        pickedListLength > 0 ?
          (
            <ul className="bg-white rounded shadow mb-4">
              <li className="border-b bg-red-300 cursor-pointer border-gray-200 px-4 py-2 flex justify-between">Picked Items</li>
              {pickedList.map(item => {
                return (
                  <li onClick={() => handleUserItemClick(item)} className="border-b hover:bg-gray-200 cursor-pointer border-gray-200 px-4 py-2 flex justify-between" key={item.id}>
                    {item.itemName}
                  </li>
                )
              })}
            </ul>
          ) : null
      }
    </div>
  )
}
