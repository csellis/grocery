import { db } from 'src/lib/db'
import { requireAuth, getUserServer } from "src/lib/auth";


export const storeCategories = () => {
  return db.storeCategory.findMany()
}

export const storeCategory = ({ id }) => {
  return db.storeCategory.findOne({
    where: { id },
  })
}

export const createStoreCategory = ({ input }) => {
  return db.storeCategory.create({
    data: input,
  })
}

export const updateStoreCategory = ({ id, input }) => {
  return db.storeCategory.update({
    data: input,
    where: { id },
  })
}
export const updateStoreOrder = ({ input }) => {

  function wait(ms = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  // create all storeCategories
  input.forEach(async (storeCategory, index) => {
    wait(20 * index).then(() => {
      return db.storeCategory.update({
        where: { id: storeCategory.id },
        data: { order: storeCategory.order }
      });
    })
  })

  // return store
  return 1
}

export const deleteStoreCategory = ({ id }) => {
  return db.storeCategory.delete({
    where: { id },
  })
}

export const StoreCategory = {
  store: (_obj, { root }) =>
    db.storeCategory.findOne({ where: { id: root.id } }).store(),
}
