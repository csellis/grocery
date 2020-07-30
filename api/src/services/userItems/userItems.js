import { db } from 'src/lib/db'
import { getUserServer } from 'src/lib/auth'

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

export const createUserItem = async props => {
  const currentUser = await getUserServer()
  const item = await db.item.findOne({
    where: { id: props.input.id }
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
  // console.log(userItemExists)

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
  return userItem.id;
}