import { db } from 'src/lib/db'
import { requireAuth, getUserServer } from "src/lib/auth";


export const stores = async () => {
  const currentUser = await getUserServer()


  return db.store.findMany({
    where: {
      userId: currentUser.id
    },
    include: {
      StoreCategory: {
        orderBy: {
          order: "desc"
        }
      }
    }
  })
}

export const store = ({ id }) => {
  return id === null ? [] : db.store.findOne({
    where: { id },
  })
}

export const createStore = async ({ input }) => {

  const currentUser = await getUserServer()
  // get categories
  const categories = await db.category.findMany({})
  // get storeId
  const store = await db.store.create({
    data: {
      ...input,
      user: {
        connect: { id: currentUser.id }
      }
    },
  })
  // sort categories
  categories.sort((a, b) => a.id - b.id)

  function wait(ms = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  // create all storeCategories
  categories.forEach(async (category, index) => {
    wait(20 * index).then(() => {
      return createStoreCategory();
    })

    function createStoreCategory() {
      return db.storeCategory.create({
        data: {
          order: index,
          categoryName: category.name,
          categoryId: category.id,
          store: {
            connect: { id: store.id }
          }
        }
      })
    }
  })

  // return store
  return store
}

export const updateStore = ({ id, input }) => {
  return db.store.update({
    data: input,
    where: { id },
  })
}

export const deleteStore = async ({ id }) => {

  const upd = await db.store.update({
    where: { id },
    data: {
      StoreCategory: {
        deleteMany: [{ storeId: id }],
      },
    },
  })
  console.log(upd)
  return db.store.delete({
    where: { id },
  })
}

export const Store = {
  user: (_obj, { root }) => db.store.findOne({ where: { id: root.id } }).user(),
  StoreCategory: (_obj, { root }) =>
    db.store.findOne({ where: { id: root.id } }).StoreCategory(),
}
