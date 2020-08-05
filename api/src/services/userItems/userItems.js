import { db } from 'src/lib/db'
import { getUserServer, requireAuth } from 'src/lib/auth'

export const userItems = async () => {
  const currentUser = await getUserServer();

  if (currentUser) {
    return db.userItem.findMany({
      where: { userId: currentUser.id },
      orderBy: {
        createdAt: "desc"
      }
    })
  }
  return [];
}

export const categorizeItem = async props => {
  const { userItemId, categoryId } = props.input

  console.log('Hello from userItems')
  console.log(userItemId, categoryId)
}


export const deleteUserItem = async props => {
  const { userItemId } = props.input

  // require a user
  requireAuth();
  // fetch userItem
  const userItem = await db.userItem.findOne({
    where: { id: userItemId }
  })
  // fetch user
  const currentUser = await getUserServer()

  // console.log(userItem)
  // require user is deleting their own item
  if (userItem.userId === currentUser.id) {
    // delete useritem
    const deletedItem = await db.userItem.delete({
      where: { id: userItemId }
    })

    return deletedItem.id;
  }
}

export const createUserItem = async props => {
  const currentUser = await getUserServer()
  const item = await db.item.findOne({
    where: { id: props.input.id },
    include: {
      category: true,
    },
  })

  // find if userItem exists
  const userItemExists = await db.userItem.findMany({
    where: {
      userId: { equals: currentUser.id },
      itemId: { equals: item.id }
    }
  })
  if (userItemExists.length > 0) {
    return userItemExists[0].id
  }
  // console.log(item)

  const userItem = await db.userItem.create({
    data: {
      itemName: item.name,
      itemId: item.id,
      categoryName: item.category.name,
      categoryId: item.category.id,
      picked: false,
      user: {
        connect: { id: currentUser.id }
      }
    }
  });
  return userItem.id;
}