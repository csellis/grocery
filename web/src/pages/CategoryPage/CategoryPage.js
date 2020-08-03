import CategoriesLayout from 'src/layouts/CategoriesLayout'
import CategoryCell from 'src/components/CategoryCell'

const CategoryPage = ({ id }) => {
  return (
    <CategoriesLayout>
      <CategoryCell id={id} />
    </CategoriesLayout>
  )
}

export default CategoryPage
