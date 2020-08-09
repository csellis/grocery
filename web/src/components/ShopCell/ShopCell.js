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


  const filteredList = []

  store.StoreCategory.forEach(storeCategory => {
    userItems.forEach(userItem => {
      if (storeCategory.categoryId === userItem.categoryId) {
        filteredList.push({ ...userItem, order: storeCategory.order })
      }
    })
  })


  return (
    <div>
      <ul className="bg-white shadow rounded">
        {filteredList.map(userItem => {
          return (
            <li className="border-b border-gray-200 px-4 py-2 flex justify-between" key={userItem.id}>
              <span>
                {userItem.itemName}
              </span>
              <span className="text-gray-400">
                {userItem.categoryName}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

