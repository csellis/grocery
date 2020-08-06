import { db } from 'src/lib/db'

export const storeCategories = () => {
  return db.storeCategory.findMany()
}

export const StoreCategory = {
  category: (_obj, { root }) =>
    db.storeCategory.findOne({ where: { id: root.id } }).category(),
  store: (_obj, { root }) =>
    db.storeCategory.findOne({ where: { id: root.id } }).store(),
}
