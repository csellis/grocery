import ApplicationLayout from 'src/layouts/ApplicationLayout'
import EditStoreCell from 'src/components/EditStoreCell'

const EditStorePage = ({ id }) => {
  return (
    <ApplicationLayout>
      <EditStoreCell id={id} />
    </ApplicationLayout>
  )
}

export default EditStorePage
