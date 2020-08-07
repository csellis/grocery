import { db } from 'src/lib/db'
import { requireAuth, getUserServer } from "src/lib/auth";


export const stores = () => {
  const currentUser = await getUserServer()


  return db.store.findMany({
    where: { userId: currentUser.id }
  })
}

export const store = ({ id }) => {
  return db.store.findOne({
    where: { id },
  })
}

export const createStore = async ({ input }) => {

  const currentUser = await getUserServer()

  return db.store.create({
    data: {
      ...input,
      user: {
        connect: { id: currentUser.id }
      }
    },
  })
}

export const updateStore = ({ id, input }) => {
  return db.store.update({
    data: input,
    where: { id },
  })
}

export const deleteStore = ({ id }) => {
  return db.store.delete({
    where: { id },
  })
}

export const Store = {
  user: (_obj, { root }) => db.store.findOne({ where: { id: root.id } }).user(),
  StoreCategory: (_obj, { root }) =>
    db.store.findOne({ where: { id: root.id } }).StoreCategory(),
}
