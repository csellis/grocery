import { useState } from "react";
import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes, Link } from '@redwoodjs/router'
import StoreForm from 'src/components/StoreForm'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

export const QUERY = gql`
  query FIND_STORE_BY_ID($id: Int!) {
    store: store(id: $id) {
      id
      userId
      name
      StoreCategory {
        categoryName
        order
        id
      }
    }
  }
`
const UPDATE_STORE_MUTATION = gql`
  mutation UpdateStoreMutation($id: Int!, $input: UpdateStoreInput!) {
    updateStore(id: $id, input: $input) {
      id
    }
  }
`

const DELETE_STORE_MUTATION = gql`
  mutation DeleteStoreMutation($id: Int!) {
    deleteStore(id: $id) {
      id
    }
  }
`

const UPDATE_STORE_ORDER = gql`
  mutation UpdateStoreOrder($input: [StoreCategoryOrder]) {
    updateStoreOrder(input: $input)
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ store }) => {
  const { addMessage } = useFlash()
  const [updateStore, { loading, error }] = useMutation(UPDATE_STORE_MUTATION, {
    onCompleted: () => {
      navigate(routes.stores())
      addMessage('Store updated.', { classes: 'rw-flash-success' })
    },
  })

  const [deleteStore] = useMutation(DELETE_STORE_MUTATION, {
    onCompleted: () => {
      navigate(routes.stores())
      addMessage('Store deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    updateStore({ variables: { id, input } })
  }

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete store ' + id + '?')) {
      deleteStore({ variables: { id } })
    }
  }

  const storeCategories = () => {
    return store.StoreCategory.sort((a, b) => a.order - b.order);
  }

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl text-gray-800">Edit Store</h2>
        <button
          onClick={() => onDeleteClick(store.id)}
          className="py-2 px-4 text-white bg-red-700 hover:bg-red-600 focus:bg-redred-500 rounded-lg shadow-md"
        >
          Delete Store
        </button>
      </div>
      <div className="rw-segment-main">
        <StoreForm
          store={store}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>

      <div className="bg-white px-4 py-5 w-full sm:w-2/3 border-b border-gray-200 sm:px-6">

        <div className="py-3 text-sm">
          <SortableComponent storeCategories={storeCategories()} store={store} />
        </div>
      </div>
    </div >
  )
}

const SortableItem = SortableElement(({ value, index }) => {
  return (
    <li className="border-t border-gray-200">
      <a href="#" className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
        <div className="px-4 py-4 flex items-center sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                {value.categoryName}
              </div>
            </div>
            <div className="mt-4 flex-shrink-0 sm:mt-0">
              <div className="flex overflow-hidden">
                {value.order}
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  )
});

const SortableList = SortableContainer(({ items }) => {
  // console.log(items)
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        {items?.map((value, index) => {
          //console.log(value)
          return (
            <SortableItem key={value.id} index={index} value={value} />
          )
        }
        )}

      </ul>
    </div>
  );
});

// 1. Add a save button
// 2. Add a handler
// 3. Create a mutation to save new order for this list to RW
// 4. RefetchQuery


const SortableComponent = ({ storeCategories, store }) => {

  const [items, setItems] = useState(storeCategories)


  const [updateStoreOrder] = useMutation(UPDATE_STORE_ORDER)

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems((items) => {
      // console.table(items)
      // console.log(`Old Index: ${oldIndex}`)
      // console.log(`New Index: ${newIndex}`)

      const newArray = arrayMove(items, oldIndex, newIndex);

      // console.table(newArray)
      return newArray
    });
  };
  ////console.table(items)

  const handleSaveOrder = () => {
    // console.table(items)
    const newOrder = items.map((item, index) => {
      item.order = index
      delete item.__typename
      return item;
    })
    // console.table(newOrder)
    // console.log(newOrder)
    updateStoreOrder({
      variables: {
        input: newOrder
      }
    })
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <span className="text-lg text-gray-800">
          {store.name}
        </span>
        <span>
          <button onClick={handleSaveOrder} className="border rounded text-gray-800 px-4 py-2 hover:bg-gray-100 focus:bg-gray-100">Save</button>
        </span>
      </div>
      <SortableList items={items} onSortEnd={onSortEnd} />
    </div>
  )

}
