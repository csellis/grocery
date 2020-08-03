import { db } from 'src/lib/db'

export const categories = () => {
  return db.category.findMany()
}

export const category = ({ id }) => {
  return db.category.findOne({
    where: { id },
  })
}

export const createCategory = ({ input }) => {
  return db.category.create({
    data: input,
  })
}

export const updateCategory = ({ id, input }) => {
  return db.category.update({
    data: input,
    where: { id },
  })
}

export const deleteCategory = ({ id }) => {
  return db.category.delete({
    where: { id },
  })
}

export const Category = {
  items: (_obj, { root }) =>
    db.category.findOne({ where: { id: root.id } }).items(),
}
