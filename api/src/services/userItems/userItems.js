import { db } from 'src/lib/db'
import { getUserServer } from 'src/lib/auth'

export const userItems = () => {
  return db.userItem.findMany()
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