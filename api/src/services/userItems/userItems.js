import { db } from 'src/lib/db'

export const userItems = () => {
  return db.userItem.findMany()
}

export const UserItem = {
  user: (_obj, { root }) =>
    db.userItem.findOne({ where: { id: root.id } }).user(),
}
