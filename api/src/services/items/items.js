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

export const createUserItem = async (props) => {
  const currentUser = await getUserServer();
  const userId = currentUser && currentUser.id;
  const itemId = props.input.id;
  const userItem = await db.item.update({
    where: { id: itemId },
    data: {
      users: {
        connect: { id: userId }
      }
    }
  })
  console.log(userItem)
  return props.id;
}

export const createItem = ({ input }) => {
  requireAuth()
  return db.item.create({
    data: input,
  })
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
