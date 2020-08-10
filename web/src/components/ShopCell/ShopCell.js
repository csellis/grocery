import { useMutation } from "@redwoodjs/web";
import { useState, useRef, useEffect } from 'react'

import Downshift from "downshift";
import uniqBy from "lodash/uniqBy";

export const QUERY = gql`
  query ShopQuery($selectedStore: Int) {
    userItems {
      id
      itemName
      categoryName
      categoryId
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

  // convert set to array
  const keys = [...categorySet]

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
                    className="border-b hover:bg-gray-200 cursor-pointer border-gray-200 px-4 py-2 flex justify-between"
                    key={categoryItem.id}>
                    {categoryItem.itemName}
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

