import { db } from 'src/lib/db'
import { requireAuth } from "src/lib/auth";

export const items = () => {
  return db.item.findMany()
}

export const item = ({ id }) => {
  return db.item.findOne({
    where: { id },
  })
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
