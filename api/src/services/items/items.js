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


// Category ID 42 === Uncategorized
export const createItem = async ({ input }) => {
  requireAuth()
  console.log('Hellow Orld')
  return await db.item.create({
    data: {
      name: input.name,
      category: {
        connect: { id: 42 }
      }
    },
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
      },
    },
  })
  console.log(itemExists)
  // Create item if it doesn't exist
  if (itemExists.length === 0) {
    const item = await db.item.create({
      data: {
        name,
        category: {
          connect: { id: 42 }
        }
      }
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
  console.log('deleteItem being hit for some reason')
  return db.item.delete({
    where: { id },
    data: {
      category: {
        disconnect: true
      }
    }
  })
}

export const Item = {
  category: (_obj, { root }) =>
    db.item.findOne({ where: { id: root.id } }).category()
}