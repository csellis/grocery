import { Link } from '@redwoodjs/router'
import ApplicationLayout from "src/layouts/ApplicationLayout";

const StoresPage = () => {
  return (
    <ApplicationLayout>
      <h1>Stores Page</h1>
      <p>Find me in "./web/src/pages/StoresPage/StoresPage.js"</p>
      <p>
        My default route is named "stores", link to me with `
        <Link to="stores">routes.stores()</Link>`
      </p>
    </ApplicationLayout>
  )
}

export default StoresPage
