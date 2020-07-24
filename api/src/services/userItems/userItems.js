import { db } from 'src/lib/db'
import { getUserServer } from 'src/lib/auth'

export const userItems = async () => {
  const currentUser = await getUserServer();

  if (currentUser) {
    return db.userItem.findMany({
      where: { userId: currentUser.id }
    })
  }
  return [];
}

export const createUserItem = async props => {
  const currentUser = await getUserServer()
  const item = await db.item.findOne({
    where: { id: props.input.id }
  })

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