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
  // Set defaults of virtual list, set used to remove duplicates
  const filteredList = []
  let categorySet = new Set()

  // Sort incoming categories
  const sorted = store.StoreCategory.sort((a, z) => {
    return a.order - z.order
  })

  // Iterate over categories pulling out categories not in user's grocery list
  sorted.forEach(storeCategory => {
    userItems.forEach(userItem => {
      if (storeCategory.categoryId === userItem.categoryId) {
        filteredList.push({ ...userItem, order: storeCategory.order })
        categorySet.add(storeCategory)
      }
    })
  })
  // console.table(filteredList)

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

  return (
    <div>
      <ul className="bg-white shadow rounded">
        {keys.map((category) => {
          const categoryItems = filteredList.filter((listItem) => {
            return listItem.categoryId === parseInt(category.categoryId)
          })
          return (
            <React.Fragment key={category.id}>
              <li className="border-b bg-red-300 cursor-pointer border-gray-200 px-4 py-2 flex justify-between">
                {category.categoryName}
              </li>
              {categoryItems.map(categoryItem => {
                return (
                  <li
                    onClick={() => handleUserItemClick(categoryItem)}
                    className="border-b hover:bg-gray-200 cursor-pointer border-gray-200 px-4 py-2 flex justify-between"
                    key={categoryItem.id}>
                    <span>

                      {categoryItem.itemName}
                    </span>
                    <span>
                      {categoryItem.picked ? "Yes" : "No"}
                    </span>
                  </li>
                )
              })}
            </React.Fragment>
          )
        })}

      </ul>
    </div>
  )
}

