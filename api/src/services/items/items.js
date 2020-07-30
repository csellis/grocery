import { db } from 'src/lib/db'
import { requireAuth, getUserServer } from "src/lib/auth";

export const items = () => {
  return db.item.findMany()
}

export const item = ({ id }) => {
  return db.item.findOne({
    where: { id },
  })
}

export const itemsByName = ({ name }) => {
  return db.item.findMany({
    where: {
      name: {
        contains: name
      }
    },
  })
}

export const createItem = ({ input }) => {
  requireAuth()
  return db.item.create({
    data: input,
  })
}

export const createItemAndUserItem = async ({ input }) => {
  requireAuth();
  const { name } = input;
  // Check if item exists
  const itemExists = await db.item.findMany({
    where: {
      name: {
        equals: name
      }
    },
  })
  // Create item if it doesn't exist
  if (itemExists.length === 0) {
    const item = await db.item.create({
      data: input
    });
    // Create userItem
    // Connect that with the user
    const currentUser = await getUserServer()

    const userItem = await db.userItem.create({
      data: {
        itemName: item.name,
        itemId: item.id,
        picked: false,
        user: {
          connect: { id: currentUser.id }
        }
      }
    });
    // return the item
    return item;
  }
}

export const updateItem = ({ id, input }) => {
  requireAuth()

  return db.item.update({
    data: input,
    where: { id },
  })
}

export const deleteItem = ({ id }) => {
  requireAuth()

  return db.item.delete({
    where: { id },
  })
}
