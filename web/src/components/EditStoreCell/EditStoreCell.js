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

      <div className="bg-white px-4 py-5 w-2/3 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Store Categories
        </h3>
        <div className="py-3 text-sm">
          <SortableComponent storeCategories={storeCategories()} />

          {storeCategories().map(category => {

            return (
              <div
                key={category.id}
                className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                <div className="flex-grow font-medium px-2">{category.categoryName}</div>
                <div className="text-sm font-normal text-gray-500 tracking-wide">{category.order}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}



const SortableItem = SortableElement(({ value, index }) => {
  return (
    <li>{value.categoryName} - {value.order}</li>
  )
});

const SortableList = SortableContainer(({ items }) => {
  // console.log(items)
  return (
    <ul>
      {items?.map((value, index) => {
        //console.log(value)
        return (
          <SortableItem key={value.id} index={index} value={value} />
        )
      }
      )}
    </ul>
  );
});

// 1. Add a save button
// 2. Add a handler
// 3. Create a mutation to save new order for this list to RW
// 4. RefetchQuery


const SortableComponent = ({ storeCategories }) => {

  const [items, setItems] = useState(storeCategories)

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems((items) => {
      // console.table(items)
      // console.log(`Old Index: ${oldIndex}`)
      // console.log(`New Index: ${newIndex}`)

      const newArray = arrayMove(items, oldIndex, newIndex);

      // console.table(newArray)
      return newArray
    })
  };
  ////console.table(items)

  return <SortableList items={items} onSortEnd={onSortEnd} />
}
