import { useMutation } from "@redwoodjs/web";

export const QUERY = gql`
  query UserItemsQuery {
    userItems {
      id
      itemName
      categoryName
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

export const Success = ({ userItems }) => {

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
      />

      <UserItemsTable
        handleCancelClick={handleCancelClick}
        userItems={categorizedUserItems()}
        title="Grocery List"
        headerColor="bg-gray-200"
        showCategory={true}
      />

    </div>
  )
}


const UserItemsTable = ({ userItems, title, headerColor = "bg-gray-200", handleCancelClick, showCategory = true }) => {
  return (
    <div className="-my-2 py-2 mt-4 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
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
                <tr className="bg-white" key={userItem.id}>
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
    </div>
  )
}