import { db } from 'src/lib/db'
import { getUserServer, requireAuth } from 'src/lib/auth'
import { AuthenticationError, context } from '@redwoodjs/api'

export const userItems = async () => {
  const currentUser = await getUserServer();

  if (currentUser) {
    return db.userItem.findMany({
      where: { userId: currentUser.id },
      // orderBy: {
      //   createdAt: "desc"
      // }
    })
  }
  return [];
}


export const categorizeItem = async props => {
  const { userItemId, categoryId } = props.input

  // console.log('Hello from userItems')
  // console.log(userItemId, categoryId)

  // require auth
  requireAuth();
  // fetch category
  const category = await db.category.findOne({
    where: { id: categoryId }
  })
  // console.log(category)
  // fetch userItem
  const userItem = await db.userItem.findOne({
    where: { id: userItemId }
  })
  // console.log(userItem)
  // update canonical item
  const updatedItem = await db.category.update({
    where: { id: categoryId },
    data: {
      items: {
        connect: { id: userItem.itemId }
      }
    }
  })
  // update userItem
  const updatedUserItem = await db.userItem.update({
    where: { id: userItemId },
    data: {
      categoryName: category.name,
      categoryId: category.id
    }
  })

  return updatedUserItem.id;
}

export const checkOutList = async props => {
  console.log(props)

  // get user
  const userId = await getUserServer().id;
  // find userItems that have been picked
  const pickedUserItems = await db.userItem.deleteMany({
    where: { picked: true, userId }
  })
  // console.log(pickedUserItems)
  // delete each of those items
  return pickedUserItems.count
}

export const updateUserItem = async props => {
  const { id, picked } = props.input

  // // require a user
  requireAuth()
  // authorize user
  const currentUser = await getUserServer()
  const userItem = await db.userItem.findOne({
    where: { id }
  })

  if (currentUser.id === userItem.userId) {
    const updatedItem = await db.userItem.update({
      where: { id },
      data: { picked }
    })
    // console.log(updatedItem)
    return updatedItem.id
  } else {
    throw new AuthenticationError('Sorry, you are not authorized to do that.')
    console.warn("Not the user")
  }
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