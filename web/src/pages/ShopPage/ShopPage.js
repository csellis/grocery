import { useState, useEffect } from "react";
import { Link } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import ApplicationLayout from "src/layouts/ApplicationLayout";
import ShopCell from "src/components/ShopCell";
import StoresSelectCell from "src/components/StoresSelectCell";

export const QUERY = gql`
  query STORES {
    stores {
      id
      name
    }
  }
`

const ShopPage = () => {

  const { data } = useQuery(QUERY);
  const defaultStoreId = data?.stores[0].id;
  const [selectedStore, setSelectedStore] = useState(defaultStoreId);

  useEffect(() => {
    setSelectedStore(defaultStoreId)
  }, [defaultStoreId])

  return (
    <ApplicationLayout>
      <div className="max-w-7xl mx-auto px-4 sm:max-w-2xl sm:px-6 md:px-8">
        <StoresSelectCell selectedStore={selectedStore} setSelectedStore={setSelectedStore} />
        <ShopCell selectedStore={parseInt(selectedStore)} />
      </div>
    </ApplicationLayout>
  )
}

export default ShopPage
