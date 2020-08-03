import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import CategoryForm from 'src/components/CategoryForm'

export const QUERY = gql`
  query FIND_CATEGORY_BY_ID($id: Int!) {
    category: category(id: $id) {
      id
      name
    }
  }
`
const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategoryMutation($id: Int!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ category }) => {
  const { addMessage } = useFlash()
  const [updateCategory, { loading, error }] = useMutation(
    UPDATE_CATEGORY_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.categories())
        addMessage('Category updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateCategory({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Category {category.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CategoryForm
          category={category}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
