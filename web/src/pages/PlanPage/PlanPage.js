import { Link } from '@redwoodjs/router'
import ApplicationLayout from "src/layouts/ApplicationLayout";
import UserItems from 'src/components/UserItemsCell'
const PlanPage = () => {
  return (
    <ApplicationLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Plan</h1>
        <UserItems />
      </div>
    </ApplicationLayout>
  )
}

export default PlanPage
